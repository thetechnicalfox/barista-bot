const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

const self = new Discord.Client();
const config = require("./config.json");
self.config = config;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    self.on(eventName, event.bind(null, self));
  });
});

self.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    self.commands.set(commandName, props);
  });
});

self.login(config.token);