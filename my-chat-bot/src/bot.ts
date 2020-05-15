// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ActivityHandler, MessageFactory } from 'botbuilder';

export class EchoBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            const messageText = context.activity.text;
            if (messageText.toLowerCase().includes('help')){
                const helpText = '..huhmm..I know who can help! Ask https://www.google.com/'
                await context.sendActivity(MessageFactory.text(helpText, helpText));
            } else if (messageText.toLowerCase().includes('kim')){
                const KimText = 'Go check out https://smartandsecurecomputing.org/kimnguyen/'
                await context.sendActivity(MessageFactory.text(KimText, KimText))
            }
            else{
                const echoResponse = 'Echo: ' + messageText; 
                await context.sendActivity(MessageFactory.text(echoResponse, echoResponse));
            }
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Hey there! I\'m a bot but I have a name. People call me Kim, I\'m here to keep you entertained, ask me who Kim is!';
            for (const member of membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}
