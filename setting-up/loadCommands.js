const { Collection } = require('discord.js');
const fs = require('fs');
const capitilizeWord = require('../utils/capitilizeWord');

module.exports = client => {
  // Sets up all the commands from each command folder in the commands directory
  const allCommandDirs = fs
    .readdirSync('./commands')
    .filter(dir => dir.endsWith(''));

  allCommandDirs.forEach(dir => {
    const commandDirName = capitilizeWord(dir);
    client[`commands${commandDirName}`] = new Collection();

    const files = fs
      .readdirSync(`./commands/${dir}`)
      .filter(file => file.endsWith('.js'));

    files.forEach(file => {
      // console.log(file);
      const command = require(`../commands/${dir}/${file}`);
      try {
        client[`commands${commandDirName}`].set(command.data.name, command);
      } catch (error) {
        console.log(
          `WARNING: There is an unfinished file in ./commands/${dir} named ${file}`,
        );
      }
    });
  });
};
