// const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, Intents } = require('discord.js');

const { REST } = require('@discordjs/rest');
const { time } = require('console');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();
const fs = require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

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

    const timer = () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    };

    const checkApi = async () => {
      let response = client.guilds.cache.get(process.env.BOT_GUILD_ID);
      while (!response) {
        console.log('Retrying. . .');
        await timer();
        response = await client.guilds.cache.get(process.env.BOT_GUILD_ID);
      }
      return;
    };
    await checkApi();

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
client.login(token);
