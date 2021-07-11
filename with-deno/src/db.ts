import { Database } from "./deps.ts";

export type Item = {
  id: string;
  name: string;
  amount: number;
  price: number;
  ownerName: string;
};

export type User = {
  name: string;
  uuid: string;
};

export const itemsDb = new Database<Item>("../db/items.json");
export const usersDb = new Database<User>("../db/users.json");

// Initialization
export const initDatabases = async () => {
  await itemsDb.insertOne({
    id: crypto.randomUUID(),
    ownerName: "bob",
    name: "hammer",
    amount: 3,
    price: 12,
  });

  await usersDb.insertOne({
    name: "bob",
    uuid: crypto.randomUUID(),
  });
};
