import { Markup, Scenes } from "telegraf";
import { MyContext } from "../interfaces";
import { menu } from "../services/keyboards";


export const steps = [
  async (ctx: MyContext) => {
    ctx.reply("Type your address line 1 📮");
    ctx.session.address = {};
    return ctx.wizard.next();
  },
  async (ctx: MyContext) => {
    if ("text" in ctx.message) {
      ctx.session.address.addressline = ctx.message.text;
    }
    ctx.reply(
      "Now, please send your location 📍",
      Markup.keyboard([Markup.button.locationRequest("Send location")]).resize()
    );

    return ctx.wizard.next();
  },
  async (ctx: MyContext) => {
    if ("location" in ctx.message) {
      ctx.session.address.location = ctx.message.location;
    }

    ctx.reply(
      "To make delivering your shipment easier, please send a photo of your door/building.\nIf you don't wish to do so, just type /pass"
    );
    return ctx.wizard.next();
  },
  async (ctx: MyContext) => {
    if ("photo" in ctx.message) {
      const fileId: string = ctx.message.photo[0].file_id;
      await ctx.telegram.getFileLink(fileId).then((url) => {
        ctx.session.address.photoURL = url.href;
      });
    } else if ("text" in ctx.message && ctx.message.text !== "/pass") {
      ctx.reply("Please send a photo or send /pass");
      return;
    }

    await ctx.reply("Address has been updated 🎉!");
    ctx.reply(
      "Please choose a service from the menu ✨\n\nOr click /help to see my commands 🧰",
      menu.oneTime().resize()
    );
    return ctx.scene.leave();
  },
];

export const updateAddrWizard = new Scenes.WizardScene("updateAddr", ...steps);
