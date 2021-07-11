import { Application, Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";

import { init } from "./db.ts";
const { itemsDb, usersDb } = await init();

const router = new Router();
router
  .post("/auth", (ctx) => {
    let uuid = crypto.randomUUID();
    ctx.response.body = uuid;
  })
  .get("/items", async (ctx) => {
    const items = await itemsDb.findMany();
    ctx.response.body = items;
  })
  .get("/items/:id", async (ctx) => {
    if (!ctx.params?.id) return;
    const item = await itemsDb.findOne({ id: ctx.params.id });
    ctx.response.body = item;
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
