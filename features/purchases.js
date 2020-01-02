const orders = require('../models/orders')
const { to } = require('await-to-js')
const bby = require('../modules/bbyapi')
const { forEachAsync } = require('foreachasync')
let page = 1

async function displayPurchases (answer, convId, limit) {
  const [errorPag, results] = await to(orders.getDocs(convId, page, limit))

  if (errorPag) console.log(errorPag)

  await forEachAsync(results, async element => {
    const data = await bby.getProductBySku(element.sku)
    answer.attachment.payload.elements.push({
      title: data.name,
      image_url: data.image,
      subtitle: `Sale Price ${data.salePrice}\n` +
            `Order date ${element.date}`,
      buttons: [{
        type: 'postback',
        title: 'Repeat',
        payload: `ORDER_${element.sku}`
      }]
    })
  })
}

// navigation buttons
const menu = {
  content_type: 'text',
  title: 'Main menu',
  payload: 'MAIN_MENU_PAYLOAD'
}

const next = {
  content_type: 'text',
  title: 'Next',
  payload: 'MY_PURCHASES_PAYLOAD'
}

const prev = {
  content_type: 'text',
  title: 'Previous',
  payload: 'MY_PURCHASES_PAYLOAD'
}
module.exports = (controller) => {
  controller.on('message,direct_message,facebook_postback', async (bot, message) => {
    const convId = message.sender.id
    const limit = 2
    const [errorCount, docCount] = await to(orders.countDocuments({ convId: message.sender.id }))

    if (errorCount) console.log(errorCount)
    const pageCount = Math.ceil(docCount / limit)

    if (message.quick_reply && message.quick_reply.payload === 'MY_PURCHASES_PAYLOAD') {
      let answer = require('../attachments/generic_template.json')
      answer.attachment.payload.elements = []
      answer.quick_replies = []
      if (message.text === 'Next') page++
      if (message.text === 'Previous') page--

      if (!pageCount) {
        answer = require('../attachments/main_menu.json')
        answer.text = 'sorry, but there are no items!'
        console.log('No documents')
      } else if (pageCount === 1) {
        answer.quick_replies = [menu]
      } else if (page === 1) {
        answer.quick_replies = [
          menu,
          next
        ]
      } else if (page > 1 && page < pageCount) {
        answer.quick_replies = [
          prev,
          menu,
          next
        ]
      } else { // page === pageCount
        answer.quick_replies = [
          prev,
          menu
        ]
      }
      await displayPurchases(answer, convId, limit)
        .then(() => bot.reply(message, answer))
    }
  })
}
