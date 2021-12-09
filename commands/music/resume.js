const { SlashCommandBuilder } = require('@discordjs/builders');
const getPlayer = require('./sessionData/index');

// Error handlers
const checkUserInVoice = require('./errorHandler/checkUserInVoice');
const isPlayingMusic = require('./errorHandler/isPlayingMusic');
const isUserWithBot = require('./errorHandler/isUserWithBot');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resumes the current song'),
  // .setDefaultPermission(false)
  async execute(interaction) {
    // Check user is in voice channel
    checkUserInVoice(interaction);

    const player = await getPlayer(interaction, false);

    // Check if user is in same voice channel as bot
    isUserWithBot(interaction, player);

    if (player.isPlayerPaused()) {
      player.resume();
      interaction.reply({
        content: `Song resumed`,
        ephemeral: true,
      });
    } else {
      interaction.reply({
        content: `You can't resume that which hasn't been paused`,
        ephemeral: true,
      });
    }
  },
};
