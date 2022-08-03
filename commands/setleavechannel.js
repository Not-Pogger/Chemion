const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require('discord.js');
const GuildSettings = require('../models/GuildSettings');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("setleavechannel")
		.setDescription("Set the leave message channel")
		.addChannelOption(option => 
			option.setName("channel")
			.setDescription("The channel to set as the leave channel")
			.setRequired(true)
		),
	async execute(interaction) {
		// Return if user is not an admin
		if (!interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) {
			interaction.reply({ content: "Sorry you do not have permission to use that command" });
			return;
		}

		GuildSettings.findOne({ guildID: interaction.guild.id }, (err, settings) => {
			if (err) {
				console.error(err);
				interaction.reply({ content: "An error occurred while trying to set the leave channel" });
				return;
			}

			if (!settings) {
				settings = new GuildSettings({
					guild_id: interaction.guild.id,
					leave_channel_id: interaction.options.getChannel("channel").id
				});
			} else {
				settings.leave_channel_id = interaction.options.getChannel("channel").id;
			}

			settings.save(err => {
				if (err) {
					console.error(err);
					interaction.reply({ content: "An error occurred while trying to set the leave channel" });
					return;
				}
			
				interaction.reply({ content: "Leave Channel has been set to <#" + interaction.options.getChannel("channel") + ">" });
			});
		});
	},
};
