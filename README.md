# Telegram Bot 🤖

A telegram bot built using [Telegraf.js](https://telegraf.js.org/) for the <strong>Wholesome Boutique 🛍️</strong>.
<br/>You can try it out at [t.me/WholesomeB_bot](t.me/WholesomeB_bot)!

## Getting Started 👨‍💻

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

🐳 Docker: (optional, I will show you how to run it directly if you have node.js installed).
<br/><br/>🦾 Bot Token: you can obtain your bot token from [/botfather](https://t.me/botfather) with the <strong>/newbot</strong> command.
<br/><br/>🔗 Mongo URI: An easy way to obtain a mongo URI is from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register), check out [this tutorial](https://medium.com/@bretcameron/mongodb-a-beginners-guide-8fca0c7787a4) to see how.


### Installing

First, clone this repository

```
git clone https://github.com/MohammedAlmeshal/TelegrafBot.git
```

In the root dictionary, create a **.env** file

```
touch .env
```

Next, open the **.env** file and provide your Bot token and mongo URI like this

```
BOT_TOKEN=<your_token>
MONGOdb_URI=<your_mongoURI>
```

## Running

### Using Docker 🐳 

First, build the image

```
docker build .
```

Now, run the container and map port 3000 on the container to port 3000 on your machine

```
docker run -p 3000:3000 <image_id>
```

You're all set!, the bot should be running now 👍.


### Running directly 💻

First, run

```
npm install
```
Then run

```
npm run dev
```
You're all set!, the bot should be running now 👍.
