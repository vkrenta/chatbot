const favourites = require('../models/favourites')

module.exports = (controller) => {
  controller.hears('FAVOURITES_(.*)', 'facebook_postback', async (bot, message) => {
    const sku = message.postback.payload.split('_')[1]

    await favourites.findOrCreate({ sku: sku })
      .then(() => bot.reply(message, 'Your item in favourites'))
      .catch(err => console.log(err))
  })
}
