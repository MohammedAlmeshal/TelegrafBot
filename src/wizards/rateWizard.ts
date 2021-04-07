import { Markup, Scenes } from "telegraf";
import { MyContext } from "../interfaces";
import { ratingKeyboard, yesNoKeyboard } from "../services/keyboards";
import { menu } from "../services/keyboards";

// Wizard steps
const rateWizardSteps = [
  async (ctx: MyContext) => {
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
    ctx.reply(
      "Please choose a service from the menu ✨\n\nOr click /help to see my commands 🧰",
      menu.oneTime().resize()
    );
    return ctx.scene.leave();
  },
];

// export wizard to bot
export const rateWizard = new Scenes.WizardScene("rate", ...rateWizardSteps);
