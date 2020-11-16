const fs = require('fs');
const Discord = require('discord.js');
const path = require("path");

const self = new Discord.Client();

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    self.on(eventName, event.bind(null, self));
  });
});

self.commands = new Discord.Collection();

function walk(dir, callback) {
  fs.readdir(dir, function(err, files) {
      if (err) throw err;
      files.forEach(function(file) {
          const filepath = path.join(dir, file);
          fs.stat(filepath, function(err,stats) {
              if (stats.isDirectory()) {
                  walk(filepath, callback);
              } else if (stats.isFile() && file.endsWith('.js')) {
                  let command = require(`./${filepath}`);
                  console.log(`Loading command ${filepath}`);
                  self.commands.set(command.name, command);
              }
          });
      });
  });
}
walk(`./commands/`)

self.login(process.env.TOKEN);
