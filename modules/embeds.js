const Discord = require('discord.js');

const newErrorEmbed = (error) => {
          errorEmbed = new Discord.MessageEmbed()
          .setColor('FF0000')
          .setTitle('Error')
          .setDescription(error)
          .setTimestamp()
          .setFooter('Barista Bot', 'https://i.imgur.com/WtJZ3Wk.png');
          return errorEmbed;
    };
const embedAddField = (name, value) => {
    errorEmbed.addFields({name: `${name}`, value: `${value}`});
}
exports.newErrorEmbed = newErrorEmbed;
exports.embedAddField = embedAddField;