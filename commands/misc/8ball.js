const { SlashCommandBuilder } = require('@discordjs/builders');

const shake8Ball = () => {
  return `${Math.ceil(Math.random() * 3)}`;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('eightball')
    .setDescription('Shakes the 8ball')
    .setDefaultPermission(false),

  async execute(interaction) {
    await interaction.reply(shake8Ball());
  },
};
