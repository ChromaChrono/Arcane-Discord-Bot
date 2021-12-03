const { Client, Intents } = require('discord.js');
require('dotenv').config();

// const deployCommands = require('./deploy-commands');

console.log('Setting up bot');

const setupEvents = require('./setting-up/loadEvents');
const setupCommands = require('./setting-up/loadCommands');
const setupPerms = require('./setting-up/setPerms');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const token = process.env.BOT_TOKEN;

const setup = async () => {
  // await deployCommands(client);
  await setupEvents(client);

  await setupCommands(client);
  await setupPerms(client);
};

setup();

client.login(token);
