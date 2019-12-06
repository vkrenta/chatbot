module.exports = (controller) => {

controller.hears('test', 'message_received',async function(bot, message) {
    
    
    var attachment = {
        'type':'template',
        'payload':{
            'template_type':'generic',
            'elements':[
                {
                    'title':'Chocolate Cookie',
                    'image_url':'http://cookies.com/cookie.png',
                    'subtitle':'A delicious chocolate cookie',
                    'buttons':[
                        {
                        'type':'postback',
                        'title':'Eat Cookie',
                        'payload':'chocolate'
                        }
                    ]
                },
            ]
        }
    };

    await bot.reply(message, {
        attachment: attachment,
    });

});

controller.on('facebook_postback', async function(bot, message) {

    if (message.payload == 'chocolate') {
        await bot.reply(message, 'You ate the chocolate cookie!')
    }

});

}