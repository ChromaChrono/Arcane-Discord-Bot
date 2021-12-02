const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');

const createSummary = () => {
  const summary = {
    name: 'Arcane-Santuary',
    introChannel: false,
  };
  try {
    fs.writeFileSync(
      './servers/arcane-sanctuary.json',
      JSON.stringify(summary),
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('init')
    .setDescription('Initial setup for the bot')
    .setDefaultPermission(false),
  async execute(interaction) {
    console.log('what');
    createSummary(interaction);
  },
};
