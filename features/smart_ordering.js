/* eslint-disable camelcase */
/* eslint-disable no-return-await */
const { BotkitConversation } = require('botkit')
const orders = require('../models/orders')

module.exports = (controller) => {
  let sku
  const DIALOG_ID = 'ordering'
  const convo = new BotkitConversation(DIALOG_ID, controller)

  // quick_replies for address/phone confirmation
  const quick_replies = [
    {
      content_type: 'text',
      title: 'Yes',
      payload: 'YES'
    },
    {
      content_type: 'text',
      title: 'No',
      payload: 'NO'
    }
  ]

  // confirmation questions
  const answerPhone = {
    text: 'Is there {{vars.phone}} your phone? If no, pls try again :3',
    quick_replies
  }
  const answerAddress = {
    text: 'Is this your actual address? {{vars.address}} ',
    quick_replies
  }

  // back to menu option
  const backToMenuButton = [
    {
      content_type: 'text',
      title: 'Back to main menu',
      payload: 'MAIN_MENU_PAYLOAD'
    }
  ]
  const backToMenuFromConvo = {
    text: 'Our courier will contact you within 2 hours',
    quick_replies: backToMenuButton
  }
  const backToMenuFromRate = {
    text: 'Thnx! <3',
    quick_replies: backToMenuButton
  }

  // rate buttons
  const rate = {
    text: 'Pls, tell me did you like the product. ' +
    'How do you estimate recommend our proguct to your friends?',
    quick_replies: []
  }
  for (let index = 1; index <= 10; index++) {
    rate.quick_replies.push({
      content_type: 'text',
      title: `${index}`,
      payload: 'RATE_PAYLOAD'
    })
  }

  // dialog init
  convo.say('Hmm, nice choise')
  convo.addAction('getting_phone')
  convo.addQuestion('Please, share your phone, format 0DDDDDDDDD ' +
  '(example 0123456789)', (response, convo, bot) => {
    if (!/0\d{9}\b/.test(response)) {
      return bot.say('Incorrect phone number. Try again').then(() => convo.repeat())
    }
    return convo.gotoThread('confirm_phone')
  }, 'phone', 'getting_phone')

  convo.addAction('confirm_phone')
  convo.addQuestion(answerPhone, (response, convo, bot) => {
    if (response.toLowerCase() === 'yes') return convo.gotoThread('getting_address')
    if (response.toLowerCase() === 'no') return convo.gotoThread('getting_phone')
    return bot.say('Incorrect answer. Try again').then(() => convo.repeat())
  }, '_phconfirmed', 'confirm_phone')

  convo.addAction('getting_address')
  convo.addQuestion('Share your address', (response, convo, bot) => {
    return convo.gotoThread('confirm_address')
  }, 'address', 'getting_address')

  convo.addAction('confirm_address')
  convo.addQuestion(answerAddress, (response, convo, bot) => {
    if (response.toLowerCase() === 'yes') return bot.say(backToMenuFromConvo)
    if (response.toLowerCase() === 'no') return convo.gotoThread('getting_address')
    return bot.say('Incorrect answer. Try again').then(() => convo.repeat())
  }, '_adconfirmed', 'confirm_address')

  // sending convo results to DB
  // after 20 sec user gets a message with rating buttons
  convo.after((results, bot) => {
    setTimeout(async () => {
      const bot = await controller.spawn(results.user)
      await bot.startConversationWithUser(results.user)
      await bot.say(rate)
    }, 20000)

    return orders.create({
      sku: sku,
      convId: results.user,
      phone: results.phone,
      address: results.address,
      date: Date.now()
    })
      .then(() => console.log('You succesfully added new document'))
      .catch(reason => console.log(`Error: ${reason}`))
  })

  controller.addDialog(convo)

  // when user presses Buy product button, dialog begins
  controller.hears('BUY_(.*)', 'facebook_postback', (bot, message) => {
    sku = message.postback.payload.split('_')[1]
    return bot.beginDialog(DIALOG_ID)
  })

  // when user presses 1-10 rating buttons
  controller.hears(new RegExp(/\d/), 'message,direct_message,facebook_postback', (bot, message) => {
    if (message.quick_reply &&
      message.quick_reply.payload === 'RATE_PAYLOAD') return bot.reply(message, backToMenuFromRate)
  })
}
