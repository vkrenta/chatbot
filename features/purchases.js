const user = require('../models/user')
const { to } = require('await-to-js')
const bby = require('../modules/bbyapi')
const { forEachAsync } = require('foreachasync')
// eslint-disable-next-line prefer-const
let page = 1

module.exports = (controller) => {
  controller.on('message,direct_message,facebook_postback', async (bot, message) => {
    const convId = message.sender.id
    const limit = 2
    const [errorCount, docCount] = await to(user.orders.countDocuments({ convId: message.sender.id }))

    if (errorCount) console.log(errorCount)
    const pageCount = Math.ceil(docCount / limit)
    let answer = require('../attachments/generic_template.json')
    answer.attachment.payload.elements = []
    // answer.quick_replies = undefined

    if (message.quick_reply && message.quick_reply.payload === 'MY_PURCHASES_PAYLOAD') {
      if (!pageCount) {
        answer = require('../attachments/main_menu.json')
        answer.text = 'sorry, but there are no items!'
        console.log('No documents')
      } else if (pageCount >= 1) {
        const [errorPag, results] = await to(user.orders.getDocs(convId, page, limit))

        if (errorPag) console.log(errorPag)

        await forEachAsync(results, async element => {
          await bby.getProductBySku(element.sku)
            .then(data => {
              answer.attachment.payload.elements.push({
                title: data.name,
                image_url: data.image,
                subtitle: `Sale Price ${data.salePrice}\n` +
                  `Order date ${element.date}`,
                buttons: [{
                  type: 'postback',
                  title: 'Order',
                  payload: `ORDER_${element.sku}`
                }]
              })
            })
        })
      }
      await bot.reply(message, answer)
    }
  })
}
