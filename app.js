const fs = require('fs');
const Discord = require('discord.js');
const {prefix, token} = require('./config.json');

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

  if (command.guildOnly && message.channel.type !=='text') {
    return message.reply(`I cannot execute that command inside DMs!`);
  }

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments!`;
    if (command.usage) {
      reply += `\nThe proper usage for this command should be: \`${prefix}${command.name} ${command.usage}\``;
    }
    return message.channel.send(reply);
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('There was an error while attempting to execute that command.')
  }
});

self.login(token);