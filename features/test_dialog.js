/* eslint-disable camelcase */
/* eslint-disable no-return-await */
const { BotkitConversation } = require('botkit')

module.exports = (controller) => {
  const DIALOG_ID = 'ordering'
  const convo = new BotkitConversation(DIALOG_ID, controller)

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

  const answerPhone = {
    text: 'Is there {{vars.phone}} your phone? If no, pls try again :3',
    quick_replies
  }

  const answerAddress = {
    text: 'Is this your actual address? {{vars.address}} ',
    quick_replies
  }

  const backToMenu = {
    text: 'Our courier will contact you within 2 hours',
    quick_replies: [
      {
        content_type: 'text',
        title: 'Back to main menu',
        payload: 'MAIN_MENU_PAYLOAD'
      }
    ]
  }

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

  convo.say('Hmm, nice choise')
  convo.addAction('getting_phone')
  convo.addQuestion('Please, share your phone, format 0DDDDDDDDD ' +
  '(example 0123456789)', async (response, convo, bot) => {
    if (!/0\d{9}\b/.test(response)) {
      await bot.say('Incorrect phone number. Try again')
      return await convo.repeat()
    }
    return await convo.gotoThread('confirm_phone')
  }, 'phone', 'getting_phone')

  convo.addAction('confirm_phone')
  convo.addQuestion(answerPhone, async (response, convo, bot) => {
    if (response.toLowerCase() === 'yes') return await convo.gotoThread('getting_address')
    if (response.toLowerCase() === 'no') return await convo.gotoThread('getting_phone')
    await bot.say('Incorrect answer. Try again')
    return await convo.repeat()
  }, '_phconfirmed', 'confirm_phone')

  convo.addAction('getting_address')
  convo.addQuestion('Share your address', async (response, convo, bot) => {
    return await convo.gotoThread('confirm_address')
  }, 'address', 'getting_address')

  convo.addAction('confirm_address')
  convo.addQuestion(answerAddress, (response, convo, bot) => {
    if (response.toLowerCase() === 'yes') {
      console.log('before timeout ' + Date.now())
      bot.say(backToMenu)
      return new Promise(resolve => setTimeout((resolve), 1000))
        .then(() => {
          console.log('after ' + Date.now())
          bot.say(rate)
        })
    }
    if (response.toLowerCase() === 'no') return convo.gotoThread('getting_address')
    bot.say('Incorrect answer. Try again')
      .then(() => convo.repeat())
  }, '_adconfirmed', 'confirm_address')

  convo.after(async (results, bot) => {

  })

  controller.addDialog(convo)

  controller.hears('test', 'message,direct_message,facebook_postback', async (bot, message) => {
    console.log('dwdddddddddddddddddddddddddddddd')
    await bot.beginDialog(DIALOG_ID)
  })
}
