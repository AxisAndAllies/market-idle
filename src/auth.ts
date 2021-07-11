import { usersDb } from "./db.ts";
import { RouterContext } from "./deps.ts";

export const addUser = async (ctx: RouterContext) => {
  const { name }: { name: string } = await ctx.request.body()?.value;
  if (!name) {
    ctx.response.body = {
      error: "Bad input, expecting a field `name`",
    };
    return;
  }
  let existing = await usersDb.findOne({
    name,
  });
  if (existing) {
    ctx.response.body = {
      error: "User exists",
    };
    return;
  }
  console.log(`adding new user, ${name}`);
  // make new user if not existing
  const uuid = crypto.randomUUID();
  await usersDb.insertOne({
    name,
    uuid,
  });
  ctx.response.body = {
    id: uuid,
  };
  ctx.response.type = "json";
};
