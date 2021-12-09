const { SlashCommandBuilder } = require('@discordjs/builders');

const eightBallAnswers = {
  1: 'It is certain',
  2: 'Reply hazy, try again',
  3: 'As I see it, yes',
  4: `Don't count on it`,
  5: `Ask again later`,
  6: `My reply is no`,
  7: `Most likely`,
  8: `It is decidedly so`,
  9: `Better not tell you now`,
  10: `Outlook good`,
  11: `My sources say no`,
  12: `Without a doubt`,
  13: `Cannot predict now`,
  14: `Outlook not so good`,
  15: `Yes definitely`,
  16: `Yes`,
  17: `Very doubtful`,
  18: `Concentrate and ask again`,
  19: `Signs point to yes`,
  20: `You may rely on it`,
};

const shake8Ball = () => {
  const rollD20 = Math.ceil(Math.random() * 20);
  return eightBallAnswers[rollD20];
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('eightball')
    .setDescription('Shakes the 8ball')
    .setDefaultPermission(false)
    .addStringOption(option =>
      option.setName('input').setDescription('Enter a string'),
    ),

  async execute(interaction) {
    const string = interaction.options.getString('input');
    const answer = shake8Ball();
    const noInputResponse = `thinks of a question`;
    const inputResponse = `asks: "${string}"`;
    await interaction.reply(
      `**${interaction.user.username}** shakes the 8ball and ${
        string ? inputResponse : noInputResponse
      }.\nA moment passes and the reply fades into view, it reads:\n\n${shake8Ball()}`,
    );
  },
};
