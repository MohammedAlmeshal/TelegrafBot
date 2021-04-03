import { Markup, Scenes } from "telegraf";
import { MyContext } from "./interface";

export const steps = [
  async (ctx) => {
    ctx.reply("What is your shipment tracking number ?");
    return ctx.wizard.next();
  },

  async (ctx: MyContext) => {
    if ("text" in ctx.message) {
      ctx.session.trackingNumber = ctx.message.text;
    }

    ctx.reply("Type your address line 1");
    ctx.session.address = {};
    return ctx.wizard.next();
  },
  async (ctx: MyContext) => {
    if ("text" in ctx.message) {
      ctx.session.address.addressline = ctx.message.text;
    }
    ctx.reply(
      "Now, please send your location",
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
      ctx.reply("Address has been updated!");
      return ctx.scene.leave();
    }
  },
];

export const updateAddrWizard = new Scenes.WizardScene("updateAddr", ...steps);
