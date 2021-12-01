const catchAsync = require("../utils/catchAsync");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isButton()) return;

    const client = interaction.client;
    console.log(
      `${interaction.user.tag} in #${interaction.channel.name} clicked a button.`
    );

    const command = client.commandsButton.get(interaction.commandName);

    if (!command) return;

    catchAsync(command.execute, interaction);
  },
};
