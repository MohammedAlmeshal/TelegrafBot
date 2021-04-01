import { Telegraf } from 'telegraf'


const token = process.env.BOT_TOKEN
if (token === undefined) {
  throw new Error('BOT_TOKEN must be provided!')
}
const bot = new Telegraf(token)



bot.on('text', (ctx) => {
  // Using context shortcut
  ctx.reply(`Hello ${ctx.from.first_name}`)


})


bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))