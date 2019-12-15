const bby = require('../modules/bbyapi')
module.exports = function (controller) {
  /*
   * Main menu buttons
   */
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
    // When user selects Main menu in Persistent menu
    if (message.text === 'MAIN_MENU_PAYLOAD') {
      await bot.reply(message, attachment)
    }
    // Catalogue of items
    if (message.text === 'GATALOGUE_PAYLOAD') {
      const catalogue = {
        messaging_type: 'RESPONSE',
        text: 'Select category',
        quick_replies: []
      }
      await bby.getListOfCategories(1, 10)
        .then((list) => {
          list.forEach(element => {
            catalogue.quick_replies.push(
              {
                content_type: 'text',
                title: element.name,
                payload: `CATEGORY_${element.id}`
              }
            )
          })
        })
        .then(() => {
          bot.reply(message, catalogue)
        })
        .catch(reason => {
          console.warn(reason)
        })
    }
  })
}
