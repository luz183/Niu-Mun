const { EmbedBuilder } = require('discord.js')
const { version } = require('../../package.json')
module.exports = {
    name: 'update',
    aliases: [],
    utilisation: '{prefix}update',

    execute(client, message) {
		const embed = new EmbedBuilder()

        embed.setColor('Purple');
        embed.setThumbnail(client.user.displayAvatarURL());
        embed.setTitle('Thông tin phiên bản update mới nhất :')
			
        embed.setDescription('💬Cải thiện thêm trải nghiệm người dùng.'),
        embed.addFields(
            {
                name:'Update Version :',
                value: version,
            },
            {
                name: '\u200b',
                value : '\`\`\`diff\n-Mau cam\n\`\`\`'
            }
        )
        
        
        embed.setFooter({text : '💜' , iconURL : message.author.avatarURL({ dynamic: true })});
        
        embed.setTimestamp();

        
        message.channel.send({ embeds: [embed]});
				
    },
    }