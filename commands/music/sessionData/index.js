const ytdl = require('ytdl-core');
const {
  AudioPlayer,
  StreamType,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  //   VoiceConnectionStatus,
} = require('@discordjs/voice');

class Player {
  constructor(channelId, guildId, voiceAdapterCreator) {
    this.channelId = channelId;
    this.guildId = guildId;
    this.voiceAdapterCreator = voiceAdapterCreator;
    this.player = createAudioPlayer();
    this.connection = null;
  }
  async createConnection() {
    const connection = await joinVoiceChannel({
      channelId: this.channelId,
      guildId: this.guildId,
      adapterCreator: this.voiceAdapterCreator,
      selfDeaf: false,
    });
    this.connection = connection;
    return true;
  }
  createAudioPlayer() {
    this.player = createAudioPlayer();
  }
  async getSong(link) {
    const stream = await ytdl(link, { filter: 'audioonly' });
    const song = createAudioResource(stream, {
      inputType: StreamType.Arbitrary,
    });
    return song;
  }
  async play(link) {
    const song = await this.getSong(link);
    this.player.play(song);
    this.connection.subscribe(this.player);
  }
  pause() {
    this.player.pause(this.currentResource);
  }
  resume() {
    this.player.unpause();
  }
  isPlayerPaused() {
    return this.player.state.status === 'paused';
  }
  getVoiceChannelId() {
    return this.channelId;
  }
}

const initPlayer = () => {
  let player;
  return async (interaction, creationPrivilege) => {
    if (!player && creationPrivilege) {
      player = await new Player(
        interaction.member.voice.channelId,
        interaction.member.guild.id,
        interaction.guild.voiceAdapterCreator,
      );
      console.log('New player created');
    }
    return player;
  };
};

module.exports = initPlayer();
