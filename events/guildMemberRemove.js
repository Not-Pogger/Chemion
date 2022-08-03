const Discord = require("discord.js")
const GuildSettings = require("../models/GuildSettings")

module.exports = {
	name: "guildMemberRemove",
	async execute(member, client) {
		const guildSettings = await GuildSettings.findOne({
			guildID: member.guild.id
		})

		if (!guildSettings || !guildSettings.leave_channel_id) return

		const embed = new Discord.MessageEmbed()
			.setColor('#ff483b')
			.setTitle('Member Left!')
			.setURL("https://bycrxhit.xyz/trade_offer.gif")
			.setDescription(`${member.user} has left the server :(`)
			//.setImage(`https://cdn.discordapp.com/avatars/${member.user}/${message.user.cache.avatar}.jpeg`)
			.setTimestamp()

		member.guild.channels.cache.get(guildSettings.leave_channel_id).send({ embeds: [embed] });
		console.log("A member left the server");
	},
};
