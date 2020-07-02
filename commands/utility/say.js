const { Channel, DiscordAPIError } = require("discord.js")
const Discord = require('discord.js');
const embeds = require('../../modules/embeds.js');

module.exports = {
    name: 'say',
    aliases: 'repeat',
    description: 'Repeats the message of the user',
    usage: '<channel-mention> <content>',
    args: true,
    guildOnly: true,
    execute (message, args) {
        const self = message.client;
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) {
            return message.channel.send(embeds.newErrorEmbed('Cannot perform action: Missing permission \`Manage Messages\`'))
        }
        // If channel-mention is provided:
        let channel = args[0];
        if (channel.startsWith('<#') && channel.endsWith('>')) {
            let channelID = channel.slice(2,20);
            let content = args.slice(1).join(' ');
            if (content.length === 0) return message.channel.send(embed.newErrorEmbed('Please provide a message to send.'));
            self.channels.cache.get(channelID).send(content);
            message.delete()
        } else {
        // If no channel mention:
        let content = args.join(' ');
        message.channel.send(content);
        message.delete();
        }
    }
}