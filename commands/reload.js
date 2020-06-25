const { DiscordAPIError } = require("discord.js");

const Discord = require('discord.js');

module.exports = {
    name: 'reload',
    description: 'Reloads a command',
    usage: '<command-name>',
    args: true,
    privileged: true,
    execute(message, args) {
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        
        if (!command) return message.channel.send({embed: {
            color: 'FF0000',
            title: 'Error',
            description: `There is no command listed under \`${commandName}\``,
            timestamp: new Date(),
            footer: {
                icon_url: 'https://i.imgur.com/WtJZ3Wk.png',
                text: 'Barista Bot'
            }
        }});

        delete require.cache[require.resolve(`./${command.name}.js`)];

        try {
            const newCommand = require(`./${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            message.channel.send({embed: {
                color: '386895',
                title: 'Success',
                description: `Command \`${command.name}\` was reloaded successfully.`,
                timestamp: new Date(),
                footer: {
                    icon_url: 'https://i.imgur.com/WtJZ3Wk.png',
                    text: 'Barista Bot'
                }
            }});
        } catch (error) {
            console.log(error);
            message.channel.send({embed: {
                color: 'FF0000',
                title: 'Error',
                description: `There was an error while reloading command \`${command.name}\``,
                fields: [{
                    name: 'Console Log',
                    value: `${error.message}`
                }],
                timestamp: new Date(),
                footer: {
                    icon_url: 'https://i.imgur.com/WtJZ3Wk.png',
                    text: 'Barista Bot'
                }
            }})
        }
    }
}