import { Low, JSONFile } from "lowdb";

// Use JSON file for storage
const file = "./db.json";
const adapter = new JSONFile(file);
const db = new Low(adapter);

// Read data from JSON file, this will set db.data content
await db.read();

db.data ||= { users: [], items: [] };

export default db;

export const getUserName = (id) => {
  return db.data.users.find((u) => u.id == id)?.name;
};

export const getUserID = (name) => {
  return db.data.users.find((u) => u.name == name)?.id;
};
