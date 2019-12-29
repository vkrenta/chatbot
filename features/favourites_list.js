const favourites = require('../models/favourites')
const { to } = require('await-to-js')
const { forEachAsync } = require('foreachasync')
const bby = require('../modules/bbyapi')

module.exports = (controller) => {
  controller.hears('Favourites', 'message,direct_message,facebook_postback', async (bot, message) => {
    const [err, skues] = await to(favourites.find({ convId: message.user }))

    if (err) console.log(err)
    if (!skues.length) await bot.reply(message, 'You haven\'t any favourites')
    else {
      const products = require('../attachments/generic_template.json')
      products.attachment.payload.elements = []
      await forEachAsync(skues, async element => {
        await bby.getProductBySku(element.sku)
          .then(data => {
            products.attachment.payload.elements.push({
              title: data.name,
              image_url: data.image,
              subtitle: `Price $${data.salePrice}`,
              buttons: [
                {
                  type: 'postback',
                  title: 'Order',
                  payload: `ORDER_${data.sku}`
                }
              ]
            })
          })
      })
        .then(() => bot.reply(message, products))
    }
  })
}
