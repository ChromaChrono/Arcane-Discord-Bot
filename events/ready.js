const initGuild = require("./../settings/index");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    initGuild(client);
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
