module.exports = (controller) => {
  const attachment = require('../attachments/main_menu.json')

  controller.on('facebook_postback', async (bot, message) => {
    // When user presses Get Started, it can see Hello message and main menu
    if (message.text === 'POSTBACK_PAYLOAD') {
      await bot.reply(message, 'Hello there, how are you? Lets go chatting <(^v^)>')
        .then(() => {
          bot.reply(message, attachment)
        })
        .catch(reason => {
          console.warn(reason)
        })
    }
  })
}
