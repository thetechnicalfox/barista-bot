module.exports = {
    name: 'args-info',
    description: 'Shows the command and the arguments provided',
    args: true,
    usage: `<arguments>`,
    execute(message, args) {
          message.channel.send(`Arguments: ${args} length: ${args.length}`);
    }
}