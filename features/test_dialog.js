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

  convo.say('Hmm, nice choise')
  // convo.ask('Please, share your phone, format 0DDDDDDDDD ' +
  // '(example 0123456789)', async (response, convo, bot) => {
  //   if (!/0\d{9}\b/.test(response)) {
  //     await bot.say('Incorrect phone number. Try again')
  //     await convo.repeat()
  //   }
  // }, 'phone')
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
  convo.addQuestion(answerAddress, async (response, convo, bot) => {
    if (response.toLowerCase() === 'yes') return await bot.say('Our courier will contact you within 2 hours')
    if (response.toLowerCase() === 'no') return await convo.gotoThread('getting_address')
    await bot.say('Incorrect answer. Try again')
    return await convo.repeat()
  }, '_adconfirmed', 'confirm_address')

  controller.addDialog(convo)
  controller.hears('test', 'message,direct_message,facebook_postback', async (bot, message) => {
    console.log('dwdddddddddddddddddddddddddddddd')
    await bot.beginDialog(DIALOG_ID)
  })
}
