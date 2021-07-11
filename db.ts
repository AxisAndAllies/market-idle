import { Database } from "https://deno.land/x/aloedb@0.9.0/mod.ts";

export type Item = {
  ownerName: string;
  name: string;
  amount: number;
  price: number;
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
