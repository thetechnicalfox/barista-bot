module.exports = (self, message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(self.config.prefix) !== 0 ) return;
    const args = message.content.slice(self.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = self.commands.get(command);
    if (!cmd) return;

    cmd.run(self, message, args);
};