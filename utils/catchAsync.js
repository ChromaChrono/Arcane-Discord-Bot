module.exports = async (fn, interaction) => {
  return await fn(interaction).catch(async err => {
    console.log(`An error occured: ${err}`);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  });
};
