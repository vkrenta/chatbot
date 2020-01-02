module.exports = (controller) => {
  controller.on('message,direct_message,facebook_postback', (bot, message) => {
    if (message.text === 'MAIN_MENU_PAYLOAD' ||
      (message.quick_reply && message.quick_reply.payload === 'MAIN_MENU_PAYLOAD')) {
      const attachment = require('../attachments/main_menu.json')
      attachment.text = 'Select something'
      return bot.reply(message, attachment)
    }
  })
}
