const bby = require('../modules/bbyapi')

module.exports = (controller) => {
  controller.hears('ORDER_(.*)', 'facebook_postback', (bot, message) => {
    const sku = message.postback.payload.split('_')[1]
    const template = require('../attachments/generic_template.json')
    template.attachment.payload.elements = []
    return bby.getProductBySku(sku)
      .then(data => {
        template.attachment.payload.elements.push({
          title: data.name,
          image_url: data.image,
          subtitle: `Manufacturer: ${data.manufacturer}` +
                    `\nWarranty Labor: ${data.warrantyLabor}` +
                    `\nPrice: $${data.salePrice}`,
          buttons: [
            {
              type: 'postback',
              title: 'Buy product',
              payload: `BUY_${data.sku}`
            },
            {
              type: 'postback',
              title: 'Main menu',
              payload: 'MAIN_MENU_PAYLOAD'
            }
          ]
        })
      })
      .then(() => bot.reply(message, template))
  })
}
