const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
require("dotenv").config();

const capitilizeWord = require("./utils/capitilizeWord");

const token = process.env.BOT_TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Sets up the events from the events directory
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Sets up all the commands from each command folder in the commands directory
const allCommandDirs = fs
  .readdirSync("./commands")
  .filter((dir) => dir.endsWith(""));

for (const dir of allCommandDirs) {
  const commandDirName = capitilizeWord(dir);
  client[`commands${commandDirName}`] = new Collection();

  const files = fs
    .readdirSync(`./commands/${dir}`)
    .filter((file) => file.endsWith(".js"));

  files.forEach((file) => {
    const command = require(`./commands/${dir}/${file}`);
    try {
      client[`commands${commandDirName}`].set(command.data.name, command);
    } catch (error) {
      console.log(
        `WARNING: There is an unfinished file in ./commands/${dir} named ${file}`
      );
    }
  });
}

client.login(token);
