module.exports = (self) => {
    self.user.setActivity("coffee", {type: "WATCHING"})
    console.log(`${self.user.tag} is ready, now serving users.`);
};