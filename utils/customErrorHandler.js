class InputError extends Error {
  constructor(message, isPublic = false) {
    super(message);
    this.isPublic = isPublic;
  }
}

module.exports = InputError;
