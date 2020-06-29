
module.exports = {
    name: 'update',
    description: 'Updates bot from github repository',
    privileged: true,
    execute(message, args, self) {
        require('simple-git')()
        .exec(() => message.channel.send('Starting pull...'))
        .pull((err, update) => {
        })
        .exec(() => message.channel.send('Pull completed.'));
    }
}