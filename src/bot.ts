import { Composer, Context, Markup, Scenes, Telegraf } from "telegraf";
import { Db } from "mongodb";
import { session } from "telegraf-session-mongodb";
import {MyContext} from './interface'
import {rateWizard} from './rateWizard'
import {trackWizard} from './trackWizard'
import {updateAddrWizard} from './addressWizard'
const token = process.env.BOT_TOKEN;
if (token === undefined) {
  throw new Error("BOT_TOKEN must be provided!");
}


export const setup = (db: Db) => {
  // session middleware MUST be initialized
  // before any commands or actions that require sessions
  // bot.use(session(db));
  const bot = new Telegraf<MyContext>(token);
  bot.use(session(db));

  bot.start(async (ctx) => {
    return await ctx.reply(
      "I'm going to help you manage your shipment from The Wholesome Boutique!\n\n\nPlease choose a servicve",
      Markup.keyboard([
        ["🔍 Track Shipment"], 
        ["🔍 Update Address"], 
        ["⭐️ Rate us"], 
      ])
        .oneTime()
        .resize()
    );
  });


  const stage = new Scenes.Stage<MyContext>([rateWizard,trackWizard,updateAddrWizard]);

  stage.hears(["⭐️ Rate us", "/rate"], (ctx: MyContext) => {
    ctx.scene.enter("rate");
  });
  stage.hears(["🔍 Track Shipment", "/track"], (ctx: MyContext) => {
    ctx.scene.enter("track");
  });
  stage.hears(["🔍 Update Address", "/addr"], (ctx: MyContext) => {
    ctx.scene.enter("updateAddr");
  });

  bot.use(stage.middleware());
  return bot;
};
