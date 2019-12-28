const clicks = require('../models/clicks')
const refs = require('../models/refs')
const { to } = require('await-to-js')

module.exports = (controller) => {
  const attachment = require('../attachments/main_menu.json')

  controller.on('facebook_postback', async (bot, message) => {
    // When user presses Get Started, it can see Hello message and main menu
    if (message.text === 'POSTBACK_PAYLOAD') {
      if (message.postback.referral) {
        const [err, result] = await to(refs.findOne({ creatorId: message.postback.referral.ref }))

        if (err) console.log(err)

        if (result) {
          const query = {
            reflink: result.reflink,
            creatorId: result.creatorId,
            userId: message.user
          }

          const [referr, success] = await to(clicks.createOrError(query))

          if (referr) console.log(referr)
          if (referr.message === '228') await bot.reply(message, 'You cant activate referral link twice')
          if (success) await bot.reply(message, `Your link ${result.reflink} is activated`)
        }
      }
      await bot.reply(message, 'Hello there, how are you? Lets go chatting <(^v^)>')
        .then(() => bot.reply(message, attachment))
    }
  })
}
