/* eslint-disable no-return-await */
const { BotkitConversation } = require('botkit')

module.exports = (controller) => {
  const DIALOG_ID = 'ordering'
  const convo = new BotkitConversation(DIALOG_ID, controller)

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
      await convo.repeat()
    }
    await convo.gotoThread('confirm_phone')
  }, 'phone', 'getting_phone')

  convo.addAction('confirm_phone')
  convo.addQuestion('OK, is there {{vars.phone}} your phone?', [], 'abch4', 'confirm_phone')

  controller.addDialog(convo)
  controller.hears('test', 'message,direct_message,facebook_postback', async (bot, message) => {
    console.log('dwdddddddddddddddddddddddddddddd')
    await bot.beginDialog(DIALOG_ID)
  })
}
