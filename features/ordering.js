const { BotkitConversation } = require('botkit')
const user = require('../models/user')

module.exports = (controller) => {
  let phone
  let address
  const DIALOG_ID = 'ordering_items'
  const convo = new BotkitConversation(DIALOG_ID, controller)
  convo.say('Hmmm, nice choise')
  convo.ask('Give me your phone, please', (answer, convo, bot) => {
    phone = answer
  })
  convo.ask('Ok, now your address', (answer, convo, bot) => {
    address = answer
  })
  convo.after(async (results, bot) => {
    bot.reply('Bye, bye')
  })
  controller.addDialog(convo)
  controller.hears('BUY_(.*)', 'facebook_postback', async (bot, message) => {
    const sku = message.postback.payload.split('_')[1]
    const userId = message.user
    await bot.beginDialog(DIALOG_ID)
      .then(() => {
        user.orders.create({
          convId: userId,
          phone: phone,
          address: address,
          sku: sku,
          date: Date.now()
        })
      })
  })
}
