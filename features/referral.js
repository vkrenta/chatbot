module.exports = (controller) => {
  controller.hears('Invite a friend', 'message,direct_message,facebook_postback', async (bot, message) => {
    const reflink = `m.me/${message.recipient.id}?ref=${message.user}`
    console.log(reflink)
  })
}
