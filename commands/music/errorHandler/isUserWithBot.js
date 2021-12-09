const InputError = require('../../../utils/customErrorHandler');

module.exports = (interaction, player) => {
  if (!player) {
    throw new InputError('The bot is not currently playing any music', true);
  }

  const memberVoiceId = interaction.member.voice.channelId;
  const playerVoiceId = player.getVoiceChannelId();

  if (memberVoiceId !== playerVoiceId) {
    throw new InputError(
      'You are not in the same voice channel as the bot',
      true,
    );
  }
};
