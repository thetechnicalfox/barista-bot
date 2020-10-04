module.exports  = (self, guild) => {
    const txt = `Bot has been removed from "${guild.name}" with id of ${guild.id} and ${guild.memberCount} members.`;
    console.log(txt);
}