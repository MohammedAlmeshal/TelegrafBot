import { Scenes } from "telegraf";
import { MyContext } from "../interfaces";
import ShipmentData from "../services/dummyShipment.json";
import { menu } from "../services/keyboards";

// Wizard steps
export const trackWizardSteps = [
  async (ctx: MyContext) => {
    const data = ShipmentData[0];
   await ctx.reply(
      `Your package (${data.package})\nWith tracking number:  ${ctx.session.trackingNumber}\nIs with:  ${data.shipCarrier}\nAnd has a status of:  ${data.dscoOrderStatus}`
    );

    ctx.reply(
      "Please choose a service from the menu ✨\n\nOr click /help to see my commands 🧰",
      menu.oneTime().resize()
    );
    return ctx.scene.leave();
  },
];
// export wizard to bot
export const trackWizard = new Scenes.WizardScene("track", ...trackWizardSteps);
