import { Markup,Scenes} from "telegraf";
import { MyContext } from "./interface";
import ShipmentData from './dummyShipment.json'

export const trackWizardSteps = [
  async (ctx) => {
    ctx.reply("What is your shipment tracking number ?");
    return ctx.wizard.next();
  },

  async (ctx: MyContext) => {
   if ("text" in ctx.message) {
     ctx.session.trackingNumber = ctx.message.text;
    const data = ShipmentData[0];
    ctx.reply(`Your package (${data.package}) with order ID:${data.dscoOrderId} is with:${data.shipCarrier} and has a status of:${data.dscoOrderStatus}`);
    }
     console.log(ShipmentData)

    ctx.reply("Done");
    return ctx.scene.leave();
  },
];


export const trackWizard = new Scenes.WizardScene(
  "track",
  ...trackWizardSteps
);