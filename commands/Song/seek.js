const {
  MessageEmbed
} = require(`discord.js`)
const config = require(`../../botconfig/config.json`)
const ee = require(`../../botconfig/embed.json`);
const {
  createBar,
  format
} = require(`../../handlers/functions`);
module.exports = {
  name: `seek`,
  category: `Song`,
  aliases: [``],
  description: `Seeks to a certain point in the current track.`,
  usage: `seek <time>`,
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
      //if invalid usage
      if (!args[0]) {
        let string = `${prefix}seek <Time in seconds>`
        let embed = new MessageEmbed()
        .setTitle("**:x: Invalid usage**")
        .setDescription(string)
        .setColor("#ff0000")
        if(message.guild.me.hasPermission("EMBED_LINKS")){
          message.channel.send(embed)
        }else{
          message.channel.send("**:x: Invalid usage**\n"+string)
        }
        return;
      }
      //if number is out of range return error
      if (Number(args[0]) < 0 || Number(args[0]) >= player.queue.current.duration / 1000)
        return message.channel.send(`**:x: Time cannot be longer than the song**`);
      //seek to the new Seek position
      player.seek(Number(args[0]));
      //Send Success Message
      return message.channel.send(`**:musical_note: Set position to \`${format(player.position)}\` :fast_forward:**`);
  }
};
