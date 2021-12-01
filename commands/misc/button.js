const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('button')
    .setDescription('Makes the bot think before replying')
    .setDefaultPermission(false),
  async execute(interaction) {
    if (!interaction.isCommand()) return;

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('primary')
        .setLabel('Primary')
        .setStyle('PRIMARY')
        .setEmoji(':😉:'),
    );
    const embed = new MessageEmbed()
      .setColor('#009911')
      .setTitle('Some title')
      .setURL('https://discord.js.org')
      .setDescription('Some description here');

    await interaction.reply({
      content: 'Ehhh',
      ephemeral: true,
      embeds: [embed],
      components: [row],
    });
  },
};
