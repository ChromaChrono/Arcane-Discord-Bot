module.exports = async (interaction) => {
  if (!interaction.isButton()) return;

  interaction.member.kick();
};
