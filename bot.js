const { Client, Intents } = require('discord.js');
require('dotenv').config();

const setupEvents = require('./setting-up/loadEvents');
const setupCommands = require('./setting-up/loadCommands');
const setPerms = require('./setting-up/setPerms');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES],
});

const token = process.env.BOT_TOKEN;

setupEvents(client);
setupCommands(client);

// Setting Perms once client is ready
client.once('ready', () => {
  setPerms(client);
});

client.login(token);
