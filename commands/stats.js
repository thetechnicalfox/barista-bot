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
            description: `Memory usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\nUptime: ${duration}\nUsers: ${self.users.cache.size.toLocaleString()}\nServers: ${self.guilds.cache.size.toLocaleString()}\nChannels: ${self.channels.cache.size.toLocaleString()}\nDiscord.js: v${version}`,
            timestamp: new Date(),
            footer: {
                icon_url: 'https://i.imgur.com/WtJZ3Wk.png',
                text: 'Barista Bot'
            }
        }});
    }
}