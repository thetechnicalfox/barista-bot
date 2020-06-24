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

self.once('ready', () => {
	console.log('Ready!');
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
    return message.reply(`:x: Error: I cannot execute that command inside DMs!`);
  }
  // Arguments module.exports tag
  if (command.args && !args.length) {
    let reply = ':x: Error: This command requires arguments.';
    if (command.usage) {
      reply += `\nThe proper usage for this command should be: \`${prefix}${command.name} ${command.usage}\``;
    }
    return message.channel.send(reply);
  }
  // Privileged module.exports.tag
  if (command.privileged && !message.member.id == privilegedID) {
    console.log(`User ${message.author} attempted to execute ${command.name}`);
    let reply = ':x: Error: Only bot administrators can execute this command.'
    return message.channel.send(reply);
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply(':x: There was an error while attempting to execute that command.')
  }
});

self.login(token);