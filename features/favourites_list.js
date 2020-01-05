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
      products.quick_replies = [{
        content_type: 'text',
        title: 'Main menu',
        payload: 'MAIN_MENU_PAYLOAD'
      }]
      await forEachAsync(skues, async element => {
        const [error, product] = await to(bby.getProductBySku(element.sku))
        if (error) console.log(error.status, error.statusText)

        await products.attachment.payload.elements.push({
          title: product.name,
          image_url: product.image,
          subtitle: `Price $${product.salePrice}`,
          buttons: [
            {
              type: 'postback',
              title: 'Order',
              payload: `ORDER_${product.sku}`
            }
          ]
        })
      })
      await bot.reply(message, products)
    }
  })
}
