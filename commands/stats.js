const {version} = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: 'stats',
    description: 'Provides bot statistics',
    execute (message, args, self) {
        const duration = moment.duration(self.uptime).format('D [days[], H [hrs], m [mins], s [secs]');
        message.channel.send({embed: {
            color: '386895',
            title: 'Bot Statistics',
            fields: [
                {name: 'Memory usage', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
                {name: 'Uptime', value: `${duration}`, inline: true},
                {name: 'Servers', value: `${self.guilds.cache.size.toLocaleString()}`, inline: true},
                {name: 'Channels', value: `${self.channels.cache.size.toLocaleString()}`, inline: true},
                {name: 'Users', value: `${self.users.cache.size.toLocaleString()}`, inline: true},
                {name: 'Discord.js', value: `v${version}`, inline: true}          
            ],
            timestamp: new Date(),
            footer: {
                icon_url: 'https://i.imgur.com/WtJZ3Wk.png',
                text: 'Barista Bot'
            }
        }});
    }
}