// const { BotkitConversation } = require('botkit')
// // const user = require('../models/user')

// module.exports = (controller) => {
//   let phone
//   let address
//   let sku
//   const DIALOG_ID = 'ordering_items'
//   const CHILD_ID = 'contact_info'
//   const convo = new BotkitConversation(DIALOG_ID, controller)
//   const child = new BotkitConversation(CHILD_ID, controller)

//   convo.say('Hmmm, nice choise')
//   convo.addChildDialog(CHILD_ID, 'answers')

//   child.ask('Gimme your phone number', [], 'phone_number')
//   child.ask('Next, tell me your address', [], 'address')
//   controller.addDialog(convo)
//   controller.addDialog(child)
//   controller.afterDialog(convo, async (bot, results) => {
//     await console.log(sku)
//   })
//   controller.hears('BUY_(.*)', 'facebook_postback', async (bot, message) => {
//     sku = message.postback.payload.split('_')[1]
//     await bot.beginDialog(DIALOG_ID)
//   })
// }
