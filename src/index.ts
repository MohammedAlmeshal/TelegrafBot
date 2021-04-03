import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";
import { setup } from "./bot";

const initialize = async () => {
  // Connect to mongoDB
  const db = (
    await MongoClient.connect(process.env.MONGOdb_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  ).db();

  // Pass Database to the bot
  const bot = setup(db);

  // Check if in production
  var env = process.env.NODE_ENV || "development";
  if (process.env.NODE_ENV) {
    //  Set telegram webhook
    bot.telegram.setWebhook(
      "https://calm-journey-69056.herokuapp.com/hookPath"
    );

    // initialize express
    const app = express();

    // set a GET route
    app.get("/", (req: Request, res: Response) => res.send("Request to /"));

    // Set the bot API endpoint
    app.use(bot.webhookCallback("/hookPath"));

    app.listen(process.env.PORT || 3000, () => {
      console.log("App listening on port 3000");
    });
  } else {
    // Development mode
    bot.launch();
  }
};

initialize();
