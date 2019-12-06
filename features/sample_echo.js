/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = function(controller) {

    controller.hears('sample','message,direct_message', async(bot, message) => {
        let attachment = {
            "messaging_type":"RESPONSE",
            "text": "Main menu",
            "quick_replies":[
                {
                  "content_type":"text",
                  "title":"My purchases",
                  "payload":"MY_PURCHASES_PAYLOAD",
                  "image_url":"http://example.com/img/red.png"
                },{
                  "content_type":"text",
                  "title":"Shop",
                  "payload":"SHOP_PAYLOAD",
                  "image_url":"http://example.com/img/green.png"
                },{
                  "content_type":"text",
                  "title":"Favourites",
                  "payload":"FAVOURITES_PAYLOAD",
                  "image_url":"http://example.com/img/blue.png"
                },{
                  "content_type":"text",
                  "title":"Invite a friend",
                  "payload":"INVITE_FRIEND_PAYLOAD",
                  "image_url":"http://example.com/img/yellow.png"
                }    
            ]
        };
    
        await bot.reply(message, attachment);
    });

    controller.on('facebook_postback', async function(bot, message) {

        if (message.payload == 'chocolate') {
            await bot.reply(message, 'You ate the chocolate cookie!')
        }
    
    });

}
