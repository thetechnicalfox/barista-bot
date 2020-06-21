exports.run = (self, message, args) => {
    message.channel.send("pong!").catch(console.error);
};