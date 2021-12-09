const throwIfAdmin = require('../globalErrorHandlers/throwIfOwner');

module.exports = async interaction => {
  if (!interaction.isButton()) return;
  throwIfAdmin(interaction);
  interaction.member.kick();
};
