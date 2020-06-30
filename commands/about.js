const { prefix } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
    name: 'about',
    aliases: 'help',
    description: 'Explains the purpose of the bot and provides links',
    execute (message, args) {
        const messageEmbed = new Discord.MessageEmbed()
            .setColor('386895')
            .setTitle('Barista Bot')
            .setURL('https://github.com/thetechnicalfox/barista-bot')
            .setDescription('Originating to provide a starting ground in the world of server-side JavaScript, Barista Bot serves as a perfect example of how engaging and educational simple programming projects can be. All code is publicly available on GitHub in the link above for comments and contribution.')
            .setThumbnail('https://i.imgur.com/WtJZ3Wk.png')
            .addField('Version', '1.0', true)
            .addFields(
                {name: 'Maintained by', value: 'TheTechnicalFox#0056', inline: true },
                {name: 'Commands', value: `${prefix}commands`, inlune: true} )
            .setTimestamp()
            .setFooter('Barista Bot', 'https://i.imgur.com/WtJZ3Wk.png');

        message.channel.send(messageEmbed);
    }
}