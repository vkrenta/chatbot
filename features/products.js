const bby = require('../modules/bbyapi')

module.exports = (controller) => {
  controller.on('message,direct_message,facebook_postback', async (bot, message) => {
    // Check if quick replies exists
    if (message.quick_reply && message.quick_reply.payload.split('_')[0] === 'CATEGORY') {
      const category = message.quick_reply.payload.split('_')[1]
      // Including template from JSON
      const products = require('../attachments/generic_template.json')
      products.attachment.payload.elements = []
      // Adding elements to template
      const data = await bby.getProductsByCategory(category, 1, 4)
      data.forEach(element => {
        products.attachment.payload.elements.push({
          title: element.name,
          image_url: element.image,
          subtitle: `Price $${element.salePrice}`,
          buttons: [
            {
              type: 'postback',
              title: 'Order',
              payload: `ORDER_${element.sku}`
            },
            {
              type: 'postback',
              title: 'To favourites',
              payload: `FAVOURITES_${element.sku}`
            }
          ]
        })
      })

      // Check if products elements are empty
      if (products.attachment.payload.elements.length) {
        await bot.reply(message, products)
      } else {
        await bot.reply(message, 'Sorry, but there are no items in this category D:')
      }
    }
  })
}
