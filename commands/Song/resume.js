module.exports = {
  name: `resume`,
  category: `Song`,
  aliases: [`continue`, "re", "res"],
  description: `Resumes paused music`,
  usage: `resume`,
  run: async (client, message, args, cmduser, text, prefix) => {
    //get the voice channel of the member
    const { channel } = message.member.voice;
    //if he is not connected to a vc return error
    if (!channel)  return message.channel.send(`:x: **Vào kênh đàm thoại rồi mới play được con bò à.**`);
    //send error if member is Deafed
    if(message.member.voice.selfDeaf) return message.channel.send(`:x: **Đang bị tắt tiếng kìa con bò.**`);
    //get voice channel of the bot
    const botchannel = message.guild.me.voice.channel;
    //get the music player
    const player = client.manager.players.get(message.guild.id);
    //if no player or no botchannel return error
    if(!player || !botchannel) return message.channel.send(`**:x:**`);
    //if queue size too small return error
    if(!player.current < 1) return message.channel.send(`**:x:**`);
    //if user is not in the right channel as bot, then return error
    if(player && channel.id !== player.voiceChannel)
      return message.channel.send(`**:x: Có đứa xài bố mày rồi!**`);
      //if bot connected bot not with the lavalink player then try to delete the player
      if(player && botchannel && channel.id !== botchannel.id){
        player.destroy();
      }
      //if the player is paused return error
      if (player.playing)
        return message.channel.send(`**:x: Có pause đâu mà resume?**`);
      //pause the player
      player.pause(false);
      //return success message
     return message.channel.send(`**:play_pause: Resuming :thumbsup:**`);

  }
};
