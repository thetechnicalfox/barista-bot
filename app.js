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
  self.user.setActivity(`Coffee | ${prefix}`, {type: 'WATCHING'});
  console.log(`${self.user.username} is ready!`);
});

self.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = self.commands.get(commandName)
  	|| self.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  function newErrorEmbed(error) {
    errorEmbed = new Discord.MessageEmbed()
      .setColor('FF0000')
      .setTitle('Error')
      .setDescription(error)
      .setTimestamp()
      .setFooter('Barista Bot', 'https://i.imgur.com/WtJZ3Wk.png');
}

  // GuildOnly module.exports tag
  if (command.guildOnly && message.channel.type !=='text') {
    newErrorEmbed('This command cannot be executed inside of DMs.');
    return message.channel.send(errorEmbed);
  }
  // Arguments module.exports tag
  if (command.args && !args.length) {
    newErrorEmbed('This command requires arguments.');
    if (command.usage) {
      errorEmbed.addFields( {name: 'Usage', value: `\nThe proper usage for this command should be: \`${prefix}${command.name} ${command.usage}\``});
    }
    return message.channel.send(errorEmbed);
  }
  // Privileged module.exports.tag
  if (command.privileged && !message.author == privilegedID) {
    console.log(`User ${message.author} attempted to execute command ${command.name}`);
    newErrorEmbed('Only bot administratos can execute this command.');
    return message.channel.send(errorEmbed);
  }

  try {
    command.execute(message, args, self);
  } catch (error) {
    console.error(error);
    newErrorEmbed('There was an error while attempting to execute that command.')
    message.channel.send(errorEmbed);
  }
});

self.login(token);