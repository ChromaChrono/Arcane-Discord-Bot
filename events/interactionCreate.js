const catchAsync = require('../utils/catchAsync');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (interaction.isButton()) return;

    const { client } = interaction;
    console.log(
      `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`,
    );

    const command = client.commandsMisc.get(interaction.commandName);

    if (!command) return;

    await catchAsync(command.execute, interaction);
  },
};
