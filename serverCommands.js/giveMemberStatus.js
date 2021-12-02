const wait = require('util').promisify(setTimeout);

module.exports = async interaction => {
  if (!interaction.isButton()) return;

  interaction.member.roles.add('914244870581919814');

  await interaction.reply({
    content: 'Great! The server is now yours to explore',
    ephemeral: false,
  });
  await wait(15000);
  await interaction.deleteReply();
};
