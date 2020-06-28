const { prefix } = require('../config.json');

module.exports = {
    name: 'commands',
    description: 'List all of the available commands',
    aliases: ['commands', 'cmds', 'cmd'],
    usage: '[command name]',
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push(`Here is a list of all available commands:`);
            data.push(commands.map(command => command.name).join(', '));
            data.push('\nYou can send \`${prefix}help (command name)\` to get info on a specific command.');

            return message.author.send(data, {split: true})
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
            return message.reply(`That is not a valid command.`);
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        message.channel.send(data, {split: true});
    }
}