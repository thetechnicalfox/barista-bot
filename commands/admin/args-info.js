module.exports = {
    name: 'args-info',
    description: 'Restates the provided arguments and their length.',
    args: true,
    usage: `<arguments>`,
    execute(message, args) {
          message.channel.send(`Arguments: ${args} length: ${args.length}`);
    }
}