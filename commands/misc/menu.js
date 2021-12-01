const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("menu")
    .setDescription("Shows a dropdown menu").setDefaultPermission(false),

  execute(interaction) {
    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("select")
        .setPlaceholder("Nothing selected")
        .addOptions([
          {
            label: "Select me",
            description: "This is a description",
            value: "first_option",
          },
          {
            label: "You can select me too",
            description: "This is also a description",
            value: "second_option",
          },
        ])
    );

    interaction.reply({ content: "Here is the", components: [row] });
  },
};
