const { Channel } = require("discord.js")

module.exports = {
    name: 'poll',
    aliases: 'react',
    description: 'Adds a poll to the message ID mentioned',
    usage: '<message-id>',
    args: true,
    execute(message, args) {
        let messageID = args[0];
        
        message.channel.messages.fetch(messageID).then(reactMsg => {
             reactMsg.react('👍');
             reactMsg.react('👎');
             message.react('✅');
            });
    }
}