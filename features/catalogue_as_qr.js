const bby = require('../modules/bbyapi')

module.exports = (controller) => {
  controller.on('facebook_postback', async (bot, message) => {
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
