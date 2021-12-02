const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('edit')
    .setDescription('Edits the first message!')
    .setDefaultPermission(false),
  async execute(interaction) {
    await interaction.reply('');
    await wait(100);
    await interaction.editReply('Death will');
    await wait(100);
    await interaction.editReply('Death will come');
    await wait(100);
    await interaction.editReply('Death will come soon');
    await wait(100);
    await interaction.editReply('Death will come soon . . .');
  },
};
