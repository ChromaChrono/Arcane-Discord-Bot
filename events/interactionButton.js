const catchAsync = require('../utils/catchAsync');
const giveMemberStatus = require('../serverCommands/giveMemberStatus');
const kickMember = require('../serverCommands/kickMember');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isButton()) return;

    const commands = {
      joinServer: giveMemberStatus,
      leaveServer: kickMember,
    };

    const { client } = interaction;
    console.log(
      `${interaction.user.tag} in #${interaction.channel.name} clicked a button.`,
    );

    const action = commands[interaction.customId];

    if (!action) return;

    catchAsync(action, interaction);
  },
};
