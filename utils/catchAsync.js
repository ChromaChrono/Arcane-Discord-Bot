module.exports = async (fn, interaction, optionsObj) => {
  try {
    return await fn(interaction, optionsObj);
  } catch (err) {
    console.log(err, ' in catchAsync');
    if (err.isPublic) {
      interaction.reply({ content: err.message, ephemeral: true });
    }
  }
};
