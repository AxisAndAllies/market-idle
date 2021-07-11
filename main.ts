import { init, Item, User } from "./db.ts";
import { Application, Router } from "./deps.ts";
import { log } from "./deps.ts";
const { itemsDb, usersDb } = await init();

const router = new Router();
router
  .get("/", (ctx) => {
    ctx.response.body = "hello";
  })
  .post("/auth", async (ctx) => {
    //@ts-ignore casting
    const { name } = ctx.response.body;
    let existing = await usersDb.findOne({
      name,
    });
    if (existing) {
      ctx.response.body = {
        error: "User exists",
      };
    }
    // make new user if not existing
    const uuid = crypto.randomUUID();
    let user = await usersDb.insertOne({
      name,
      uuid,
    });
    ctx.response.body = {
      id: uuid,
    };
  })
  .get("/items", async (ctx) => {
    const items = await itemsDb.findMany();
    ctx.response.body = items;
  })
  .post("/items", async (ctx) => {
    //@ts-ignore casting
    const newItem = ctx.request.body() as Item;
    const uuid = crypto.randomUUID();
    await itemsDb.insertOne({
      id: uuid,
      ownerName: "asdf",
      price: newItem.price,
      name: newItem.name,
      amount: newItem.amount,
    });
    return uuid;
  })
  .get("/items/:id", async (ctx) => {
    let id = ctx.params?.id;
    if (!id) return;
    const item = await itemsDb.findOne({ id });
    ctx.response.body = item;
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

// app.use(async (ctx, next) => {
//   await next();
//   const token = ctx.response.headers.get("Authorization")?.split(" ")[1];
//   ctx.userToken = token;
// });

await app.listen({ port: 8000 });
