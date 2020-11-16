const embeds = require('../modules/embeds.js');

module.exports = (self, message) => {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

    const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = self.commands.get(commandName)
        || self.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    // GuildOnly module.exports tag
    if (command.guildOnly && message.channel.type !=='text') {
      embeds.newErrorEmbed('This command cannot be executed inside of DMs.');
      return message.channel.send(errorEmbed);
    }
    // Arguments module.exports tag
    if (command.args && !args.length) {
      embeds.newErrorEmbed('This command requires arguments.');
      if (command.usage) {
        embeds.embedAddField('Usage',`\nThe proper usage for this command should be: \`${prefix}${command.name} ${command.usage}\``);
      }
      return message.channel.send(errorEmbed);
    }
    // Privileged module.exports.tag
    if (command.privileged && !message.author == process.env.PRIVILEGEDID) {
      console.log(`User ${message.author} attempted to execute command ${command.name}`);
      embeds.newErrorEmbed('Only bot administrators can execute this command.');
      return message.channel.send(errorEmbed);
    }

    try {
      command.execute(message, args, self);
    } catch (error) {
      console.error(error);
      embeds.newErrorEmbed('There was an error while attempting to execute that command.')
      message.channel.send(errorEmbed);
    }
  };
