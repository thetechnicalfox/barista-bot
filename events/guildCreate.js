module.exports  = (self, guild) => {
    const txt = `Bot has been added to "${guild.name}" with id of ${guild.id} and ${guild.memberCount} members.`;
    console.log(txt);
}