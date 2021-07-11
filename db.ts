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
// Initialization
export const init = async () => {
  const itemsDb = new Database<Item>("./items.json");
  const usersDb = new Database<User>("./users.json");

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
  return { itemsDb: itemsDb, usersDb: usersDb };
};
