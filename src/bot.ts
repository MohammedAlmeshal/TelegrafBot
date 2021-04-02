
import { Composer, Context, Markup, Scenes, Telegraf } from "telegraf";
import { Db } from "mongodb";
import { session } from "telegraf-session-mongodb";

const token = process.env.BOT_TOKEN;
if (token === undefined) {
  throw new Error("BOT_TOKEN must be provided!");
}

interface MySession extends Scenes.WizardSession {
  // will be available under `ctx.session.mySessionProp`
  ShippingRating: number;
  name: string;
  age: string;
}


interface MyContext extends Context {
  // will be available under `ctx.myContextProp`
  myContextProp: string;

  // declare session type
  session: MySession;
  // declare scene type
  scene: Scenes.SceneContextScene<MyContext, Scenes.WizardSessionData>;
  // declare wizard type
  wizard: Scenes.WizardContextWizard<MyContext>;
}
export const setup = (db: Db) => {
  // session middleware MUST be initialized
  // before any commands or actions that require sessions
  // bot.use(session(db));
  const bot = new Telegraf<MyContext>(token);
  bot.use(session(db));


bot.start( async ctx => {


    return await ctx.reply("I'm going to help you manage your shipment from The Wholesome Boutique!\n\n\nPlease choose a servicve", Markup
    .keyboard([
      ['🔍 Search'], // Row1 with 2 buttons
      ['☸ Setting'], // Row2 with 2 buttons
      ['⭐️ Rate us'] // Row3 with 3 buttons
    ])
    .oneTime()
    .resize()
  )
})
  

  const Wizard2 = new Scenes.WizardScene(
    "wiz2",
    async (ctx) => {
      ctx.reply("your name?");
      return ctx.wizard.next();
    },
    async (ctx: MyContext) => {
      if ("text" in ctx.message) {
        ctx.session.name = ctx.message.text;
      }
      ctx.reply("your age?");
      return ctx.wizard.next();
    },

    async (ctx: MyContext) => {
      if ("text" in ctx.message) {
        ctx.session.age = ctx.message.text;
      }
      ctx.reply("Done");
      return ctx.scene.leave();
    }
  );

  const stage = new Scenes.Stage<MyContext>([ Wizard2]);


  stage.hears(["⭐️ Rate us","/rate"] , (ctx:MyContext) => {
    ctx.scene.enter("wiz2");
  });

  bot.use(stage.middleware());
  return bot;
};
