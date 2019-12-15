module.exports = (controller) => {
  const attachment = require('../attachments/main_menu.json')

  controller.on('facebook_postback', async (bot, message) => {
    // When user selects Main menu in Persistent menu
    if (message.text === 'MAIN_MENU_PAYLOAD') {
      await bot.reply(message, attachment)
    }
  })
}
