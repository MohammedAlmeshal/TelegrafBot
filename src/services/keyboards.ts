import { Markup } from "telegraf";

export const menu: any = Markup.keyboard([
  ["đ Track Shipment"],
  ["â­ī¸ Rate Us"],
  ["đŽ Update Address"],
  ["âšī¸ Show my info"],
  ["đ§­ Change tracking number"],
]);

// define rating keyboard
export const ratingKeyboard: any = Markup.keyboard([
  ["Very Good đ¤Š"],
  ["Good đ"],
  ["Ok đļ"],
  ["Poor đ"],
  ["Very Poor đĨ´"],
]);

// define binary answer keyboard
export const yesNoKeyboard: any = Markup.keyboard([
  ["Yes đ", "No đ"],
  ["N/A â"],
]);
