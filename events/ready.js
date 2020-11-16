module.exports  = (self) => {
    self.user.setActivity(`Coffee | ${process.env.PREFIX}`, {type: 'WATCHING'});
    console.log(`${self.user.username} is ready, serving ${self.users.cache.size} users in ${self.guilds.cache.size} servers.`);
}