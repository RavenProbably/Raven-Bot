const Event = require('../structures/Event');

module.exports = class extends Event {

	async run(guild) {
		
		this.client.logger.info(`Left server ${guild.name} with ${guild.memberCount} members.`);

	}
}