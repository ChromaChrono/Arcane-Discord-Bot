require('dotenv').config();
const commandManager = require('../commandManager.json');

module.exports = async client => {
  if (!client.application?.owner) await client.application?.fetch();

  const commands = await client.guilds.cache.get(process.env.BOT_GUILD_ID)
    ?.commands;
  const fullPermissions = [];
  const commandList = await commands.fetch();

  const memberPerm = {
    id: '914244870581919814',
    type: 'ROLE',
    permission: true,
  };
  const adminPerm = {
    id: '161573417290563585',
    type: 'USER',
    permission: true,
  };

  commandList.forEach(command => {
    if (commandManager.member[command.name]) {
      fullPermissions.push({
        id: command.id,
        permissions: [memberPerm, adminPerm],
      });
    } else if (commandManager.admin[command.name]) {
      fullPermissions.push({
        id: command.id,
        permissions: [adminPerm],
      });
    }
  });

  console.log(fullPermissions);

  await client.guilds.cache
    .get(process.env.BOT_GUILD_ID)
    ?.commands.permissions.set({ fullPermissions });
};
