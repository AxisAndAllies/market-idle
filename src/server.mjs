import express from "express";
import { v4 } from "uuid";
import db, { getUserID } from "./db.mjs";

const app = express();
const port = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/auth", (req, res) => {
  let { name } = req.body;
  let existing = getUserID(name);
  if (existing) res.json({ error: "User exists" });
  let id = v4();

  db.data.users.push({ id, name });
  db.write();
  res.json({ id });
});
app.get("/items", (req, res) => {
  res.send(db.data.items);
});

app.post("/items", (req, res) => {
  res.send("Hello World!");
});

app.patch("/items/:id", (req, res) => {
  res.send("Hello World!");
});

app.delete("/items/:id", (req, res) => {
  res.send("Hello World!");
});

app.post("/items/:id/buy", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
