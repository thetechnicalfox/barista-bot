const { Channel, DiscordAPIError } = require("discord.js")
const Discord = require('discord.js');

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
            return message.channel.send({embed: {
                color: 'FF0000',
                title: 'Error',
                description: `Cannot perform action: Missing manage messages permission.`,
                timestamp: new Date(),
                footer: {
                    icon_url: 'https://i.imgur.com/WtJZ3Wk.png',
                    text: 'Barista Bot'
                }
            }});
        }
        contentError = new Discord.MessageEmbed()
            .setColor('FF0000')
            .setTitle('Error')
            .setDescription('Please provide message content.')
            .setTimestamp()
            .setFooter('Barista Bot', 'https://i.imgur.com/WtJZ3Wk.png');

        // If channel-mention is provided:
        let channel = args[0];
        if (channel.startsWith('<#') && channel.endsWith('>')) {
            let channelID = channel.slice(2,20);
            let content = args.slice(1).join(' ');
            if (content.length === 0) return message.channel.send(contentError);
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