const { DiscordAPIError } = require("discord.js")

const Discord = require('discord.js');

module.exports = {
    name: 'about',
    aliases: 'help',
    description: 'Explains the purpose of the bot and provides links',
    execute (message, args) {
        const messageEmbed = new Discord.MessageEmbed()
            .setColor('FF0000')
            .setTitle('Barista Bot')
            .setURL('https://github.com/thetechnicalfox/barista-bot')
            .setDescription('Just a simple, multi-purpose Discord Bot')
            .setThumbnail('https://i.imgur.com/WtJZ3Wk.png')
            .addFields(
                {name: 'About', value: 'Originating to provide a starting ground in the world of server-side JavaScript, Barista Bot serves as a perfect example of how engaging and educational simple programming projects can be. All code is publicly available on GitHub in the link above for comments and contribution.'},
                {name: 'Version', value: '1.0', inline: true },
                {name: 'Maintained by', value: 'TheTechnicalFox#0056', inline: true } )
            .setTimestamp()
            .setFooter('Barista Bot', 'https://i.imgur.com/WtJZ3Wk.png');

        message.channel.send(messageEmbed);
    }
}