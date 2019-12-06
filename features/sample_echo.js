/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = function(controller) {

    controller.hears('sample','message,direct_message', async(bot, message) => {
        let attachment = {
            /*"messaging_type":"RESPONSE",
            "text": "Main menu",
            "quick_replies":[
                {
                  "content_type":"text",
                  "title":"My purchases",
                  "payload":"MY_PURCHASES_PAYLOAD"
                },
                {
                  "content_type":"text",
                  "title":"Shop",
                  "payload":"SHOP_PAYLOAD"
                },
                {
                  "content_type":"text",
                  "title":"Favourites",
                  "payload":"FAVOURITES_PAYLOAD"
                },
                {
                  "content_type":"text",
                  "title":"Invite a friend",
                  "payload":"INVITE_FRIEND_PAYLOAD"
                }    
            ],*/
            "setting-type":"call_to_actions",
            "thread_state":"new_thread",
            "messaging_type":"RESPONSE",
            "text": "Main menu",
            "persistent_menu": [
                {
                    "locale": "default",
                    "call_to_actions": [
                        {
                            "type": "postback",
                            "title": "Main menu",
                            "payload": "MAIN_MENU_PAYLOAD"
                        },
                        {
                            "type": "postback",
                            "title": "Product catalog",
                            "payload": "PRODUCT_CATALOG_PAYLOAD"
                        }
                    ]
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
