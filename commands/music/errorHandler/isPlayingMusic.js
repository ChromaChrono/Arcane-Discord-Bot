const InputError = require('../../../utils/customErrorHandler');

module.exports = player => {
  if (!player) {
    throw new InputError('The bot is not currently playing music', true);
  }
};
