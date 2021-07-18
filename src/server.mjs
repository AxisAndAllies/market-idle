import cors from "cors";
import express from "express";
import { body, param, validationResult } from "express-validator";
import * as uuid from "uuid";
import db, { getItem, getUserID, getUserName } from "./db.mjs";

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    let name = getUserName(token);
    if (!name) {
      return res.sendStatus(403);
    }
    req.username = name;
    next();
  } else {
    res.sendStatus(401);
  }
};

const app = express();
const port = 8000;

// allow all, fix later
app.use(cors());
app.use(express.json());

/** Public endpoints */
app.get("/", (req, res) => {
  res.send("Hello World2");
});
app.post("/auth", body("name").isAlphanumeric(), (req, res) => {
  let { name } = req.body;
  let existing = getUserID(name);
  if (existing) {
    return res.status(400).json({ error: "User exists" });
  }
  let id = uuid.v4();

  db.data.users.push({ id, name });
  db.write();
  return res.json({ id });
});

app.get("/items", (req, res) => {
  res.json(db.data.items);
});

/** Endpoints that require authentication */
app.post(
  "/items",
  auth,
  body("price").isNumeric(),
  body("amount").isNumeric(),
  body("name").isAlphanumeric(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { name, amount, price } = req.body;
    let id = uuid.v4();
    db.data.items.push({ id, name, amount, price, ownerName: req.username });
    db.write();
    return res.json({ id });
  }
);

app.patch(
  "/items/:id",
  auth,
  body("price").isNumeric().optional(),
  body("amount").isNumeric().optional(),
  body("name").isAlphanumeric().optional(),
  param("id").isUUID(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let item = getItem(req.params.id);
    if (!item) {
      return res.status(404).json({ errors: "Item not found." });
    }
    if (item.ownerName != req.username) {
      return res.status(400).json({ errors: "Not your item." });
    }

    // update item
    let { name, amount, price } = req.body;
    item = { ...item, price, name, amount };
    let index = db.data.items.findIndex((e) => e.id == item.id);
    db.data.items[index] = item;
    db.write();
    return res.json({ id });
  }
);

app.delete("/items/:id", auth, param("id").isUUID(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let item = getItem(req.params.id);
  if (!item) {
    return res.status(404).json({ errors: "Item not found." });
  }
  if (item.ownerName != req.username) {
    return res.status(400).json({ errors: "Not your item." });
  }
  db.data.items = db.data.items.filter((u) => u.id !== req.params.id);
  db.write();
  res.json({ success: "true" });
});

app.post(
  "/items/:id/buy",
  auth,
  param("id").isUUID(),
  body("amount").isNumeric(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let item = getItem(req.params.id);
    if (!item) {
      return res.status(404).json({ errors: "Item not found." });
    }
    res.send("Hello World!");
  }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
