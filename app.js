const fs = require('fs');
const Discord = require('discord.js');
const {prefix, token, privilegedID} = require('./config.json');
const { config } = require('process');

const self = new Discord.Client();
self.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  self.commands.set(command.name, command);
}

const embeds = require('./modules/embeds.js');

self.once('ready', () => {
  self.user.setActivity(`Coffee | ${prefix}`, {type: 'WATCHING'});
  console.log(`${self.user.username} is ready, serving ${self.users.cache.size} users in ${self.guilds.cache.size} servers.`);
});

self.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
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
  if (command.privileged && !message.author == privilegedID) {
    console.log(`User ${message.author} attempted to execute command ${command.name}`);
    embeds.newErrorEmbed('Only bot administratos can execute this command.');
    return message.channel.send(errorEmbed);
  }

  try {
    command.execute(message, args, self);
  } catch (error) {
    console.error(error);
    embeds.newErrorEmbed('There was an error while attempting to execute that command.')
    message.channel.send(errorEmbed);
  }
});

self.login(token);