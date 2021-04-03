import {Markup, Scenes } from "telegraf";
import { MyContext } from "./interface";

const rateWizardSteps = [
  async (ctx) => {
    ctx.reply("What is your shipment tracking number ?");
    return ctx.wizard.next();
  },

  async (ctx: MyContext) => {
    if ("text" in ctx.message) {
      ctx.session.trackingNumber = ctx.message.text;
    }
    ctx.reply(
      "How was the shipment condition ?",
      Markup.keyboard([
        ["Very Poor"],
        ["Poor"],
        ["Ok"],
        ["Good"],
        ["Very Good"],
      ])
        .oneTime()
        .resize()
    );
    return ctx.wizard.next();
  },
  async (ctx: MyContext) => {
    ctx.session.rating = {}
    if ("text" in ctx.message) {
      ctx.session.rating.condition = ctx.message.text;
    }

    ctx.reply(
      "Was the shipment delivered to the correct location ?",
      Markup.keyboard([["Yes", "No"], ["N/A"]])
        .oneTime()
        .resize()
    );
    return ctx.wizard.next();
  },
  async (ctx: MyContext) => {

    if ("text" in ctx.message) {
        ctx.session.rating.location = ctx.message.text;
      }

    ctx.reply(
      "Were you able to track your shipment easily ?",
      Markup.keyboard([["Yes", "No"], ["N/A"]])
        .oneTime()
        .resize()
    );
    return ctx.wizard.next();
  },
  async (ctx: MyContext) => {
    if ("text" in ctx.message) {
        ctx.session.rating.tracking = ctx.message.text;
      }
    ctx.reply(
      "How would you rate youe experince ?",
      Markup.keyboard([
        ["Very Poor"],
        ["Poor"],
        ["Ok"],
        ["Good"],
        ["Very Good"],
      ])
        .oneTime()
        .resize()
    );
    return ctx.wizard.next();
  },
  async (ctx: MyContext) => {
    if ("text" in ctx.message) {
      ctx.session.rating.overall = ctx.message.text;
    }
    ctx.reply("Done");
    return ctx.scene.leave();
  },
];

export const rateWizard = new Scenes.WizardScene(
    "rate",
    ...rateWizardSteps
  );