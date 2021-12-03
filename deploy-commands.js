// const { SlashCommandBuilder } = require("@discordjs/builders");

const { REST } = require('@discordjs/rest');
const { time } = require('console');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();
const fs = require('fs');

const token = process.env.BOT_TOKEN;
const clientId = process.env.BOT_CLIENT_ID;
const guildId = process.env.BOT_GUILD_ID;

const commands = [];
const commandDirs = fs
  .readdirSync('./commands')
  .filter(dir => dir.endsWith(''));

for (const dir of commandDirs) {
  const files = fs
    .readdirSync(`./commands/${dir}`)
    .filter(file => file.endsWith('.js'));
  files.forEach(file => {
    try {
      const command = require(`./commands/${dir}/${file}`);
      commands.push(command.data.toJSON());
    } catch (error) {
      console.log(
        `WARNING: There is an unfinished file in ./commands/${dir} named ${file}`,
      );
    }
  });
}

const rest = new REST({ version: '9' }).setToken(token);

console.log(commands.length);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
