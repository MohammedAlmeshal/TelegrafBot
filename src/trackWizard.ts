import { Scenes } from "telegraf";
import { MyContext } from "./interface";
import ShipmentData from "./dummyShipment.json";

// Wizard steps
export const trackWizardSteps = [
  async (ctx) => {
    ctx.reply("What is your shipment tracking number ?");
    return ctx.wizard.next();
  },

  async (ctx: MyContext) => {
    if ("text" in ctx.message) {
      ctx.session.trackingNumber = ctx.message.text;
      const data = ShipmentData[0];
      ctx.reply(
        `Your package (${data.package})\nWith order ID:  ${data.dscoOrderId}\nIs with:  ${data.shipCarrier}\nAnd has a status of:  ${data.dscoOrderStatus}`
      );
    }

    return ctx.scene.leave();
  },
];
// export wizard to bot
export const trackWizard = new Scenes.WizardScene("track", ...trackWizardSteps);
