import { Composer, Context, Markup, Scenes, Telegraf } from "telegraf";
import { Db } from "mongodb";
import { session } from "telegraf-session-mongodb";
import { MyContext } from "./interface";
import { rateWizard } from "./rateWizard";
import { trackWizard } from "./trackWizard";
import { updateAddrWizard } from "./addressWizard";

// Verify & Connect Bot toekn
const token = process.env.BOT_TOKEN;
if (token === undefined) {
  throw new Error("BOT_TOKEN must be provided!");
}

export const setup = (db: Db) => {
  // initialize bot with custom context
  const bot = new Telegraf<MyContext>(token);

  // initialize mongodb session middleware
  bot.use(session(db));

  // on /start command
  bot.start(async (ctx) => {
    return await ctx.reply(
      "Please choose a service from the menu ✨\n\nOr click /help to see my commands 🧰",
      Markup.keyboard([
        ["🔍 Track Shipment"],
        ["⭐️ Rate Us"],
        ["📮 Update Address"],
      ])
        .oneTime()
        .resize()
    );
  });

  // on /help command
  bot.help((ctx) => {
    ctx.reply(
      "Click one of the following 👀\n\n\n/track - to track your shipment 🔍\n\n/rate - to rate our services with a quick survey 📝\n\n/addr - to update your address 📮\n\n"
    );
  });

  // set up stage with scene wizards
  const stage = new Scenes.Stage<MyContext>([
    rateWizard,
    trackWizard,
    updateAddrWizard,
  ]);

  // Scenes commands
  stage.hears(["⭐️ Rate Us", "/rate"], (ctx: MyContext) => {
    ctx.scene.enter("rate");
  });
  stage.hears(["🔍 Track Shipment", "/track"], (ctx: MyContext) => {
    ctx.scene.enter("track");
  });
  stage.hears(["📮 Update Address", "/addr"], (ctx: MyContext) => {
    ctx.scene.enter("updateAddr");
  });

  bot.use(stage.middleware());
  return bot;
};
