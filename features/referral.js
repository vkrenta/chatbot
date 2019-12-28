const refs = require('../models/refs')

module.exports = (controller) => {
  controller.hears('Invite a friend', 'message,direct_message,facebook_postback', async (bot, message) => {
    const reflink = `m.me/${message.recipient.id}?ref=${message.user}`
    console.log(reflink)

    const query = {
      creatorId: message.user,
      reflink: reflink
    }

    await refs.findOrCreate(query)
      .then((result) => bot.reply(message, `Your referral link is: ${reflink}`))
      .catch(reason => console.log(reason))
  })
}
