const mongoose = require('mongoose');

const GuildSettingsSchema = new mongoose.Schema({
	guild_id: String,
	welcome_channel_id: String,
	leave_channel_id: String,
	review_channel_id: String,
});

module.exports = mongoose.model('GuildSettings', GuildSettingsSchema);