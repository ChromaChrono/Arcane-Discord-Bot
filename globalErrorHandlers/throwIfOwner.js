module.exports = interaction => {
  if (interaction.member.id === interaction.guild.ownerId) {
    throw new Error(`Can't perform this action on an admin`);
  }
};
