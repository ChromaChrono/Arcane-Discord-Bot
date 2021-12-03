const { SlashCommandBuilder } = require('@discordjs/builders');
const ytdl = require('ytdl-core');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play your favourite tunes')
    .setDefaultPermission(false),
  async execute(interaction) {
    interaction.reply('playing song');
  },
};
