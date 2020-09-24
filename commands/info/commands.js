const { prefix } = require('../../config.json');
const Discord = require('discord.js');
const embeds = require('../../modules/embeds.js');

module.exports = {
    name: 'commands',
    description: 'List all of the available commands',
    aliases: ['commands', 'command', 'cmds', 'cmd'],
    usage: '{command name}',
    execute(message, args) {
        const { commands } = message.client;

        if (!args.length) {
            const embed = new Discord.MessageEmbed()
                .setColor('386895')
                .setTitle('Barista Bot Commands')
                .setDescription(commands.map(command => command.name).join(', '))
                .addField('Using Commands', `You can send \`${prefix}help (command name)\` to recieve information on a specific command.`)
                .setTimestamp()
                .setFooter('Barista Bot', 'https://i.imgur.com/WtJZ3Wk.png');

            return message.author.send(embed)
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I have sent you a DM with all of my commands.');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('It seems as though I cannot DM you. Do you have DMs enabled?')
                })
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            embeds.newErrorEmbed(`The command provded cannot be found`);
            return message.channel.send(errorEmbed);
        }

        let embed = new Discord.MessageEmbed()
            .setColor('386895')
            .setTitle(`${command.name} command`)
            .setDescription(command.description)
            .setTimestamp()
            .setFooter('Barista Bot', 'https://i.imgur.com/WtJZ3Wk.png');

        if (command.usage != undefined) {embed.addField('Usage', `${prefix}${command.name} ${command.usage}`);};
        message.channel.send(embed);
    }
}