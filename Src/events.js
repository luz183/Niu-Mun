const { EmbedBuilder} = require('discord.js');
const { VoiceConnectionStatus } = require('@discordjs/voice');
const player = client.player;

    player.on('error', (queue, error) => {
        console.log(`Có lỗi ở hàng chờ bài hát => ${error.message}`);
    });
    
    player.on('connectionError', (queue, error) => {
        console.log(`Lỗi kết nối => ${error.message},${error.queue}`);
    });
    player.on('connectionCreate', (queue) => {
        /*queue.connection.voiceConnection.on('stateChange', (oldState, newState) => {
            if (oldState.status === VoiceConnectionStatus.Ready && newState.status === VoiceConnectionStatus.Connecting) {
                queue.connection.voiceConnection.configureNetworking();
        }
    })*/
        queue.connection.voiceConnection.on('stateChange', (oldState, newState) => {
        const oldNetworking = Reflect.get(oldState, 'networking');
        const newNetworking = Reflect.get(newState, 'networking');

        const networkStateChangeHandler = (oldNetworkState, newNetworkState) => {
        const newUdp = Reflect.get(newNetworkState, 'udp');
        clearInterval(newUdp?.keepAliveInterval);
      }

      oldNetworking?.off('stateChange', networkStateChangeHandler);
      newNetworking?.on('stateChange', networkStateChangeHandler);
        });
    });
    player.on('trackAdd',async (queue, track) => {
        const msg = await queue.metadata.send(`**${track.title}** đã được thêm vào danh sách phát. ✅`);
        setTimeout(() => msg.delete(),3000);
    });
    
    player.on("tracksAdd", (queue, tracks) => {
    const embed = new EmbedBuilder();
    
        const title = tracks[0].playlist.title;
        const url = tracks[0].playlist.url;
        const songs = tracks.length;
        const track = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author}`);
        const nextSongs = songs > 20 ? `Và **${songs - 20}** bài hát khác...` : `Có **${songs}** bài hát trong danh sách.`;
        
        embed.setColor('Purple');
        embed.setTitle(`**${title}**`);
        embed.setURL(url);
        embed.setDescription(`Đã thêm **\`${songs}\`** bài hát vào hàng chờ \n\n${track.slice(0, 20).join('\n')}\n\n${nextSongs }`);
        embed.setTimestamp();
    
    queue.metadata.send({ embeds: [embed] });
    });
    
    player.on('trackStart',async (queue, track) => {
        if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    
        const embed = new EmbedBuilder();
    
        embed.setColor('Random');
        embed.setThumbnail(track.thumbnail);
        embed.setTitle(track.title);
        embed.setURL(track.url);
        embed.setDescription(`\`[00:00 / ${track.duration}]\` \n\n Yêu cầu bởi: ${track.requestedBy}`);
        const msg = await queue.metadata.send({ embeds: [embed]});
        setTimeout(() => msg.delete(), track.durationMS );
    
    });
    
    
    player.on('botDisconnect',async (queue) => {
        const msg1 = await queue.metadata.send('Baiii 🖐');
        setTimeout(() => msg1.delete(),3000);
    });
    
    player.on('channelEmpty',async (queue) => {
        const msg = await queue.metadata.send(' Không còn ai trong kênh thoại... 🙅‍♀️');
        setTimeout(() => msg.delete(),3000);
    });
    
    player.on('queueEnd',async (queue) => {
       const msg = await queue.metadata.send('Đã phát hết danh sách trong hàng chờ ✅');
       setTimeout(() => msg.delete(),3000);
    });
