const InputError = require('../../../utils/customErrorHandler');

module.exports = interaction => {
  const memberVoiceId = interaction.member.voice.channelId;
  if (!memberVoiceId) {
    throw new InputError(
      'You need to be in a voice channel to use this command',
      true,
    );
  }
};
