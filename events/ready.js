module.exports  = (self) => {
    self.user.setActivity(`Coffee | ${self.config.prefix}`, {type: 'WATCHING'});
    console.log(`${self.user.username} is ready, serving ${self.users.cache.size} users in ${self.guilds.cache.size} servers.`);
}