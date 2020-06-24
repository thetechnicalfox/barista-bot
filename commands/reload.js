module.exports = {
    name: 'reload',
    description: 'Reloads a command',
    args: true,
    guildOnly: true,
    execute(message, args) {
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        
        if (!command) return message.reply(`There is no command listed under \`${commandName}\``);

        delete require.cache[require.resolve(`./${command.name}.js`)];

        try {
            const newCommand = require(`./${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            message.channel.send(`Command \`${command.name}\` was reloaded successfully.`);
        } catch (error) {
            console.log(error);
            message.channel.send(`There was an error while reloading command \`${command.name}\`:\n\`${error.message}\``);
        }
    }
}