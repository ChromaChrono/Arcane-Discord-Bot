const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('defer')
    .setDescription('Makes the bot think before replying')
    .setDefaultPermission(false),
  async execute(interaction) {
    await interaction.deferReply();
    await wait(4000);
    await interaction.editReply('I have thought for long enough');
  },
};
