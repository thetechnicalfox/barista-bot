const Discord = require('discord.js');
const self = new Discord.Client();
const config = require('./config.json')

self.on('ready', () => {
  console.log(`Logged in as ${self.user.tag}!`);
});

self.on('message', message => {
    const prefix = config.prefix;
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    if (command == 'info' ) {
      const Embed = new Discord.MessageEmbed()
          .setColor('#d35933')
          .setTitle('Barista')
        	.setDescription('Just a boring utility bot that will sometimes serve you coffee.')
	        .setThumbnail('https://i.imgur.com/mBEZeTG.png')
	        .addFields(
	           	{ name: 'Version', value: '1.0', inline: true },
	          	{ name: 'Servers', value: `${self.guilds.cache.size}`, inline: true },
	          )
	        .addField('Users', `${self.users.cache.size}`, true)
	        .setTimestamp()
	        .setFooter('Designed by TheTechnicalFox', 'https://i.imgur.com/zJdTxGQ.png');

      message.channel.send(Embed);
    }
    if (command == 'commands') {
      const Embed = new Discord.MessageEmbed()
          .setColor('#d35933')
          .setTitle('Available Commands')
          .setThumbnail('https://i.imgur.com/mBEZeTG.png')
          .addFields(
            { name: 'Prefix', value: 'All commands should follow the b. prefix (example: b.info)', inline: true },
            { name: 'Commands', value: 'b.info, b.commands', inlune: true})
          .setTimestamp()
          .setFooter('Designed by TheTechnicalFox', 'https://i.imgur.com/zJdTxGQ.png')
       message.channel.send(Embed);
    }
    if (command == 'hello') {
      message.reply('Hey!')
    }
});

self.login(config.token);