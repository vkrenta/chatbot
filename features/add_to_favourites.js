const favourites = require('../models/favourites')

module.exports = (controller) => {
  controller.hears('FAVOURITES_(.*)', 'facebook_postback', (bot, message) => {
    const sku = message.postback.payload.split('_')[1]

    return favourites.findOrCreate({ convId: message.user, sku: sku })
      .then(() => bot.reply(message, 'Your item in favourites'))
      .catch(err => console.log(err))
  })
}
