import express, { Request, Response } from 'express'
import * as dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from 'mongodb';
import { setup } from './bot';

const initialize = async () => {
    const db = (await MongoClient.connect(process.env.MONGOdb_URI, { useNewUrlParser: true, useUnifiedTopology: true })).db();
    const bot = setup(db);
    // Set telegram webhook
// npm install -g localtunnel && lt --port 3000
bot.telegram.setWebhook('https://mshbot.loca.lt/secret-path')


const app = express()
app.get('/', (req: Request, res: Response) =>   res.send('hi'))
// Set the bot API endpoint

app.use(bot.webhookCallback('/secret-path'))
app.listen(3000, () => {
  console.log('Example app listening on port 3000!')

})
 

   // bot.launch();
};

initialize();
// 