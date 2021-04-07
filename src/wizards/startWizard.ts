import { Scenes, Markup } from "telegraf";
import { MyContext } from "../interfaces";
import { menu } from "../services/keyboards";

// Wizard steps
export const startWizardSteps = [
  async (ctx) => {
    ctx.reply(
      "To use my services, please give me your shipment tracking number 🔍", Markup.removeKeyboard()
    );
    return ctx.wizard.next();
  },

  async (ctx: MyContext) => {
    if ("text" in ctx.message) {
      if (/^\d{8}$/.test(ctx.message.text)) {
        ctx.session.trackingNumber = ctx.message.text;
      } else {
        ctx.reply(
          "Tracking number not valid, please try again (it must consist of 8 numbers)"
        );
        return;
      }
    }
    ctx.reply(
      "Please choose a service from the menu ✨\n\nOr click /help to see my commands 🧰",
      menu.oneTime().resize()
    );
    return ctx.scene.leave();
  },
];
// export wizard to bot
export const startWizard = new Scenes.WizardScene("start", ...startWizardSteps);
