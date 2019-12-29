'use strict'
const bby = require('../modules/bbyapi')

module.exports = (controller) => {
  controller.on('message,direct_message,facebook_postback', async (bot, message) => {
    // Check if quick replies exists
    if (message.quick_reply) {
      const category = message.quick_reply.payload.split('_')
      // Check if QR is a category
      if (category[0] === 'CATEGORY') {
        // Including template from JSON
        const products = require('../attachments/generic_template.json')
        // Adding elements to template
        await bby.getProductsByCategory(category[1], 1, 4)
          .then(data => {
            products.attachment.payload.elements = []
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
          })
          .then(() => {
            // Check if products elements are empty
            if (products.attachment.payload.elements.length) {
              bot.reply(message, products)
            } else {
              bot.reply(message, 'Sorry, but there are no items in this category D:')
            }
          })
      }
    }
  })
}
