import { initDatabases, itemsDb, Item } from "./db.ts";
import { Application, Router, RouterContext } from "./deps.ts";
import { addUser, getNameFromUUID } from "./auth.ts";
// import { log } from "./deps.ts";

// custom configuration with 2 loggers (the default and `tasks` loggers)
// await log.setup({
//   handlers: {
//     console: new log.handlers.ConsoleHandler("DEBUG"),

//     file: new log.handlers.FileHandler("WARNING", {
//       filename: "./log.txt",
//       // you can change format of output message using any keys in `LogRecord`
//       formatter: "{levelName} {msg}",
//     }),
//   },

//   loggers: {
//     // configure default logger available via short-hand methods above
//     default: {
//       level: "DEBUG",
//       handlers: ["console", "file"],
//     },

//     tasks: {
//       level: "ERROR",
//       handlers: ["console"],
//     },
//   },
// });

await initDatabases();

const getNameFromHeader = async (ctx: RouterContext) => {
  let token = ctx.response.headers.get("Authorization")?.split(" ")[1];
  const name = await getNameFromUUID(token);
  if (!name) {
    ctx.response.body = { error: "No user found." };
    return;
  }
  return name;
};

const router = new Router();
router
  .get("/", (ctx) => {
    ctx.response.body = "hello";
  })
  .post("/auth", addUser)
  .get("/items", async (ctx) => {
    const items = await itemsDb.findMany();
    ctx.response.body = items;
  })
  .post("/items", async (ctx) => {
    // create new item
    const name = await getNameFromHeader(ctx);
    if (!name) {
      return;
    }
    const newItem = (await ctx.request.body().value) as Item;

    const uuid = crypto.randomUUID();
    await itemsDb.insertOne({
      id: uuid,
      ownerName: name,
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
  })
  .patch("/items/:id", async (ctx) => {
    let id = ctx.params?.id;
    if (!id) return;
    const name = await getNameFromHeader(ctx);
    if (!name) {
      return;
    }
    const item = await itemsDb.findOne({ id, ownerName: name });
    if (!item) {
      ctx.response.body;
    }
    await itemsDb.updateOne({ id }, {});
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

app.addEventListener("error", (evt) => {
  // Will log the thrown error to the console.
  console.trace(evt.error);
});

await app.listen({ port: 8000 });
