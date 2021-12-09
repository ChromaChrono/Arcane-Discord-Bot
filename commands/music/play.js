const { SlashCommandBuilder } = require('@discordjs/builders');
const getPlayer = require('./sessionData/index');
const addHttp = require('./middleware/addHTTP');
const isWebAdress = require('./middleware/isWebAddress');
const searchKeyword = require('./middleware/searchKeyword');

// Error handlers
const checkUserInVoice = require('./errorHandler/checkUserInVoice');
const isUserWithBot = require('./errorHandler/isUserWithBot');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play your favourite tunes')
    // .setDefaultPermission(false)
    .addStringOption(option =>
      option.setName('input').setDescription('Enter a string'),
    ),
  async execute(interaction) {
    // Check to see if user is in voice channel
    checkUserInVoice(interaction);

    // Gets the player
    const player = await getPlayer(interaction, true);

    // Checks to see user is in same voice channel as bot
    isUserWithBot(interaction, player);

    // Grabs input string given by user
    const input = interaction.options.getString('input');
    let link;

    // Checks if input is web address or keyword
    if (!isWebAdress(input) && input) {
      link = await searchKeyword(input);
    } else if (input) {
      link = addHttp(input);
    }

    // Resumes the player if player was paused and
    if (player.isPlayerPaused() && !link) {
      player.resume();
    } else {
      await player.createConnection();
      await player.play(link);
      interaction.reply('playing song');
    }
  },
};
