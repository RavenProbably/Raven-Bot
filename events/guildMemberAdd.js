const { Message } = require('discord.js');
const Event = require('../structures/Event');

module.exports = class extends Event {

	async run(member) {

		let autorole = this.client.database.getAutorole(member.guild.id) ? this.client.database.getAutorole(member.guild.id) : undefined;

		if (autorole === undefined) return;

		let role = member.guild.roles.cache.find(role => role.name === autorole.rolename) || member.guild.roles.cache.get(autorole.roleid);

		member.roles.add(role);

	}
}