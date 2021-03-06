import { Composer, Context, Markup, Scenes, Telegraf } from "telegraf";
import { Db } from "mongodb";
import axios from "axios";
import fs from "fs";
import { session } from "telegraf-session-mongodb";
import { MyContext } from "./interfaces";
import { startWizard } from "./wizards/startWizard";
import { rateWizard } from "./wizards/rateWizard";
import { trackWizard } from "./wizards/trackWizard";
import { updateAddrWizard } from "./wizards/addressWizard";

// Verify & Connect Bot toekn
const token = process.env.BOT_TOKEN;
if (token === undefined) {
  throw new Error("BOT_TOKEN must be provided!");
}

export const setup = (db: Db) => {
  // initialize bot with custom context
  const bot = new Telegraf<MyContext>(token);

  // initialize mongodb session middleware
  bot.use(session(db));

  // on /help command
  bot.help((ctx) => {
    ctx.reply(
      "Click one of the following đ\n\n\n/track - to track your shipment đ\n\n/rate - to rate our services with a quick survey đ\n\n/addr - to update your address đŽ\n\n"
    );
  });

  bot.hears(["âšī¸ Show my info", "/myinfo"], (ctx) => {
    db.collection("sessions").findOne(
      { key: `${ctx.from.id}:${ctx.chat.id}` },
      async (err, result) => {
        if (err) throw err;
        const { data } = result;
        await ctx.reply(`Your tracking number is: ${data.trackingNumber}`);
        if (data.address) {
          if ("addressline" in data.address)
            await ctx.reply(`Your address is: ${data.address.addressline}`);
          if ("location" in data.address)
            await ctx.replyWithLocation(
              data.address.location.latitude,
              data.address.location.longitude
            );
          if ("photoURL" in data.address)
            handelImage(ctx, data.address.photoURL);
        }
      }
    );
  });

  // set up stage with scene wizards
  const stage = new Scenes.Stage<MyContext>([
    startWizard,
    rateWizard,
    trackWizard,
    updateAddrWizard,
  ]);

  // Scenes commands
  stage.hears(["/start", "đ§­ Change tracking number"], (ctx: MyContext) => {
    delete ctx.session.rating;
    ctx.scene.enter("start");
  });
  stage.hears(["â­ī¸ Rate Us", "/rate"], (ctx: MyContext) => {
    checkTracking(ctx, "rate");
  });
  stage.hears(["đ Track Shipment", "/track"], (ctx: MyContext) => {
    checkTracking(ctx, "track");
  });
  stage.hears(["đŽ Update Address", "/addr"], (ctx: MyContext) => {
    checkTracking(ctx, "updateAddr");
  });

  bot.use(stage.middleware());
  return bot;
};

let checkTracking = function (ctx: MyContext, sceneID: string): void {
  if (ctx.session.trackingNumber) {
    ctx.scene.enter(sceneID);
  } else {
    ctx.reply("Tracking number must be provided!");
    ctx.scene.enter("start");
  }
};

let handelImage = function (ctx: MyContext, url: string): void {
  if (url) {
    axios({ url, responseType: "stream" }).then((response) => {
      response.data
        .pipe(
          fs.createWriteStream(
            __dirname + `/services/images/${ctx.from.id}.jpg`
          )
        )
        .on("finish", () => {
          ctx.reply(`Your door/building image`);

          ctx.replyWithPhoto({
            source: __dirname + `/services/images/${ctx.from.id}.jpg`,
          });
        });
    });
  }
};
