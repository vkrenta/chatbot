const bby = require('../modules/bbyapi')
module.exports = function (controller) {
  /*
   * Main menu buttons
   */
  const attachment = {
    messaging_type: 'RESPONSE',
    text: 'Select something',
    quick_replies: [
      {
        content_type: 'text',
        title: 'My purchases',
        payload: 'MY_PURCHASES_PAYLOAD'
      },
      {
        content_type: 'text',
        title: 'Shop',
        payload: 'SHOP_PAYLOAD'
      },
      {
        content_type: 'text',
        title: 'Favourites',
        payload: 'FAVOURITES_PAYLOAD'
      },
      {
        content_type: 'text',
        title: 'Invite a friend',
        payload: 'INVITE_FRIEND_PAYLOAD'
      }
    ]
  }

  controller.on('facebook_postback', async (bot, message) => {
  // When user presses Get Started, it can see Hello message and main menu
    if (message.text === 'POSTBACK_PAYLOAD') {
      await bot.reply(message, 'Hello there, how are you? Lets go chatting <(^v^)>')
        .then(() => {
          bot.reply(message, attachment)
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
      await bby.getListOfCategories()
        .then((list) => {
          let i = 0
          list.forEach(element => {
            catalogue.quick_replies.push(
              {
                content_type: 'text',
                title: element,
                payload: 'CATEGORY_' + i
              }
            )
            i++
          })
        })
        .then(() => {
          bot.reply(message, catalogue)
        })
    }
  })
}
