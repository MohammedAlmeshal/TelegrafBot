// import { Telegraf, Context, session } from "telegraf";

// interface SessionData {
//   messageCount: number;
//   // ... more session data go here
// }

// interface MyContext extends Context {
//   session?: SessionData;
 
//   // ... more props go here
// }

// const token = process.env.BOT_TOKEN;
// if (token === undefined) {
//   throw new Error("BOT_TOKEN must be provided!");
// }

// const bot = new Telegraf<MyContext>(token);
// bot.use(session());

// // bot.start( (ctx) => {
// // ctx.reply('Hey There!\nThis is the health check bot')
// // })

// // bot.on(["sticker", "photo"], (ctx) => {

// //     if ("photo" in ctx.message) {
// //     let fileId:string = ctx.message.photo[0].file_id;
// //     ctx.telegram.getFileLink(fileId).then( url => {
// //         console.log(url)
// //     })
// //     return ctx.reply("Cool!");}

// //   });

// bot.on("message", async (ctx) => {

// //   if (ctx.session === undefined) {
// //     ctx.session = { messageCount: 0 };
// //   }
// //   ctx.session.messageCount++;
// //   await ctx.reply(`Seen ${ctx.session.messageCount} messages.`);
// console.log(ctx.message)

// });



// bot.launch();

// // Enable graceful stop
// process.once("SIGINT", () => bot.stop("SIGINT"));
// process.once("SIGTERM", () => bot.stop("SIGTERM"));
