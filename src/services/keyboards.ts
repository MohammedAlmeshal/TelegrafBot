import { Markup } from "telegraf";

export const menu: any = Markup.keyboard([
  ["🔍 Track Shipment"],
  ["⭐️ Rate Us"],
  ["📮 Update Address"],
  ["ℹ️ Show my info"],
  ["🧭 Change tracking number"],
]);

// define rating keyboard
export const ratingKeyboard: any = Markup.keyboard([
  ["Very Good 🤩"],
  ["Good 😃"],
  ["Ok 😶"],
  ["Poor 😑"],
  ["Very Poor 🥴"],
]);

// define binary answer keyboard
export const yesNoKeyboard: any = Markup.keyboard([
  ["Yes 👍", "No 👎"],
  ["N/A ✋"],
]);
