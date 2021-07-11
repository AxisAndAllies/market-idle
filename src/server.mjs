import express from "express";
import * as uuid from "uuid";
import db, { getUserID } from "./db.mjs";
import { getUserName } from "./db.mjs";
import { body, validationResult } from "express-validator";

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

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
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

app.post(
  "/items",
  auth,
  body("price").isNumeric(),
  body("amount").isNumeric(),
  body("name").isAlphanumeric(),
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { name, amount, price } = req.body;
    let id = uuid.v4();
    db.data.items.push({ id, name, amount, price, ownerName: res.username });
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
  (req, res) => {
    res.send("Hello World!");
  }
);

app.delete("/items/:id", auth, (req, res) => {
  res.send("Hello World!");
});

app.post("/items/:id/buy", auth, body("amount").isNumeric(), (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
