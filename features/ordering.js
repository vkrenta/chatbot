const { BotkitConversation } = require('botkit')
const user = require('../models/user')

module.exports = (controller) => {
  let sku
  const DIALOG_ID = 'ordering_items'
  const CHILD_ID = 'contact_info'
  const convo = new BotkitConversation(DIALOG_ID, controller)
  const child = new BotkitConversation(CHILD_ID, controller)

  convo.say('Hmmm, nice choise')
  convo.addChildDialog(CHILD_ID, 'answers')

  child.ask('Gimme your phone number', [], 'phone_number')
  child.ask('Next, tell me your address', [], 'address')

  convo.say('Our courier will contact you within 2 hours')
  controller.addDialog(convo)
  controller.addDialog(child)
  controller.afterDialog(convo, async (bot, results) => {
    console.log(sku)
    await user.orders.create({
      sku: sku,
      convId: results.user,
      phone: results.answers.phone_number,
      address: results.answers.address,
      date: Date.now()
    })
      .then(() => console.log('You succesfully added new document'))
      .catch(reason => console.log(`Error: ${reason}`))
  })
  controller.hears('BUY_(.*)', 'facebook_postback', async (bot, message) => {
    sku = message.postback.payload.split('_')[1]
    await bot.beginDialog(DIALOG_ID)
  })
}
