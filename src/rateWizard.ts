import { Markup, Scenes } from "telegraf";
import { MyContext } from "./interface";

// define rating keyboard
const ratingKeyboard = Markup.keyboard([
  ["Very Good 🤩"],
  ["Good 😃"],
  ["Ok 😶"],
  ["Poor 😑"],
  ["Very Poor 🥴"],
]);

// define binary answer keyboard
const yesNoKeyboard = Markup.keyboard([["Yes 👍", "No 👎"], ["N/A ✋"]]);

// Wizard steps
const rateWizardSteps = [
  async (ctx) => {
    ctx.reply("What is your tracking number ?");
    return ctx.wizard.next();
  },

  async (ctx: MyContext) => {
    if ("text" in ctx.message) {
      ctx.session.trackingNumber = ctx.message.text;
    }
    ctx.reply(
      "How was the shipment condition ?",
      ratingKeyboard.oneTime().resize()
    );
    return ctx.wizard.next();
  },
  async (ctx: MyContext) => {
    ctx.session.rating = {};
    if ("text" in ctx.message) {
      ctx.session.rating.condition = ctx.message.text;
    }

    ctx.reply(
      "Was the shipment delivered to the correct location ?",
      yesNoKeyboard.resize()
    );
    return ctx.wizard.next();
  },
  async (ctx: MyContext) => {
    if ("text" in ctx.message) {
      ctx.session.rating.location = ctx.message.text;
    }

    ctx.reply(
      "Were you able to track your shipment easily ?",
      yesNoKeyboard.oneTime().resize()
    );
    return ctx.wizard.next();
  },
  async (ctx: MyContext) => {
    if ("text" in ctx.message) {
      ctx.session.rating.tracking = ctx.message.text;
    }
    ctx.reply(
      "How would you rate youe experince ?",
      ratingKeyboard.oneTime().resize()
    );
    return ctx.wizard.next();
  },
  async (ctx: MyContext) => {
    if ("text" in ctx.message) {
      ctx.session.rating.overall = ctx.message.text;
    }
    Markup.removeKeyboard();
    ctx.reply("Survey finished!\nThank you 🙏 ");
    return ctx.scene.leave();
  },
];

// export wizard to bot
export const rateWizard = new Scenes.WizardScene("rate", ...rateWizardSteps);
