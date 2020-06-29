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

  // GuildOnly module.exports tag
  if (command.guildOnly && message.channel.type !=='text') {
    return message.channel.send({embed: {
      color: 'FF0000',
      title: 'Error',
      description: 'This command cannot be executed inside of DMs.',
      timestamp: new Date(),
      footer: {
        icon_url: 'https://i.imgur.com/WtJZ3Wk.png',
        text: 'Barista Bot'
      }
    }})
  }
  // Arguments module.exports tag
  if (command.args && !args.length) {
    let embed = new Discord.MessageEmbed()
      .setColor('FF0000')
      .setTitle('Error')
      .setDescription('This command requires arguments.')
      .setTimestamp()
      .setFooter('Barista Bot','https://i.imgur.com/WtJZ3Wk.png');
    if (command.usage) {
      embed.addFields( {name: 'Usage', value: `\nThe proper usage for this command should be: \`${prefix}${command.name} ${command.usage}\``});
    }
    return message.channel.send(embed);
  }
  // Privileged module.exports.tag
  if (command.privileged && !message.author == privilegedID) {
    console.log(`User ${message.author} attempted to execute command ${command.name}`);
    return message.channel.send({embed: {
      color: 'FF0000',
      title: 'Error',
      description: 'Only bot administrators can execute this command.',
      timestamp: new Date(),
      footer: {
        icon_url: 'https://i.imgur.com/WtJZ3Wk.png',
        text: 'Barista Bot'
      }
    }});
  }

  try {
    command.execute(message, args, self);
  } catch (error) {
    console.error(error);
    message.channel.send({embed: {
      color: 'FF0000',
      title: 'Error',
      description: 'There was an error while attempting to execute that command.',
      timestamp: new Date(),
      footer: {
        icon_url: 'https://i.imgur.com/WtJZ3Wk.png',
        text: 'Barista Bot'
      }
    }})
  }
});

self.login(token);