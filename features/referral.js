const refs = require('../models/refs')

module.exports = (controller) => {
  controller.hears('Invite a friend', 'message,direct_message,facebook_postback', async (bot, message) => {
    const reflink = `m.me/${message.recipient.id}?ref=${message.user}`
    const menu = require('../attachments/main_menu.json')
    menu.text = 'Send link to 3 friends and get a gift (O.O)'
    console.log(reflink)

    const query = {
      creatorId: message.user,
      reflink: reflink
    }

    await refs.findOrCreate(query)
      .then(() => bot.reply(message, `Your referral link is: ${reflink}`))
      .then(() => bot.reply(message, menu))
      .catch(reason => console.log(reason))
  })
}
