const { SlashCommandBuilder } = require('@discordjs/builders');
const getPlayer = require('./sessionData/index');
const checkUserInVoice = require('./errorHandler/checkUserInVoice');
const isPlayingMusic = require('./errorHandler/isPlayingMusic');
const isUserWithBot = require('./errorHandler/isUserWithBot');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pause the current song'),
  // .setDefaultPermission(false)
  async execute(interaction) {
    const player = await getPlayer(interaction, false);

    // Check to see if the bot is playing any music
    isPlayingMusic(player);
    // Check to see if command user is in voice channel
    checkUserInVoice(interaction);
    // Check to see if user is in same voice channel as bot
    isUserWithBot(interaction, player);

    player.pause();

    interaction.reply({
      content: 'You paused the current song',
      ephemeral: true,
    });
  },
};
