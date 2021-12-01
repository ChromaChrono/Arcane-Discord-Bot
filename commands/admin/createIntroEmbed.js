const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const getChannel = require("../../utils/getChannel");

require("dotenv").config();

const createEmbed = () => {
  const embed = new MessageEmbed()
    .setColor("#000000")
    .setTitle("Welcome to the Arcane Sanctuary!")
    .setURL("https://discord.js.org/")
    .setDescription(
      "Welcome to the Arcane Sanctuary! :) You stand on the doorstep of our sanctuary and you are more than welcome to come inside and join us, however before you do, there are a few things you may want to know. The server has a lot of channels. To keep things clean and tidy I have made a lot of channels role specific. To access the channels you want, or hide them again in the future, we have a channel found in the settings category called role-manager. You can find the settings category just below the chat category. Be sure to use the role manager to explore our sever and tailor it for you. There is no need for a list of rules. Just don’t be toxic towards others or make them feel unwelcome. We are all here to chat, play games, and have fun. Anyone is welcome. To access the server, type 'unlock' in chat. We are expecting you :)"
    )
    .setImage(
      "https://cdn.pixabay.com/photo/2016/08/11/22/12/door-1587023_960_720.jpg"
    );
  return embed;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("create-intro")
    .setDescription("Creates welcome message")
    .setDefaultPermission(false),
  async execute(interaction) {
    if (getChannel(interaction).name === process.env.GUILD_WELCOME_CHANNEL) {
      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("joinServer")
          .setLabel("Accept and join")
          .setStyle("SUCCESS"),
        new MessageButton()
          .setCustomId("leaveServer")
          .setLabel("Disagree and leave")
          .setStyle("DANGER")
      );
      const embed = createEmbed();

      await interaction.channel.send({
        ephemeral: false,
        embeds: [embed],
        components: [row],
      });
      await interaction.reply({
        content: "success!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content:
          "This is the wrong channel for that command. Please use the welcome channel.",
        ephemeral: true,
      });
    }
  },
};
