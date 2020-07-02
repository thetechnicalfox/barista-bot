const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');

const self = new Discord.Client();
self.config = config;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    self.on(eventName, event.bind(null, self));
  });
});

self.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands//${file}`);
  self.commands.set(command.name, command);
}

self.login(config.token);