const Event = require('../structures/Event');
const { MessageEmbed } = require('discord.js');
const colors = require('../colors.json');
const { stripIndents } = require('common-tags');

module.exports = class extends Event {

	async run(guild) {

		const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'));

		const embed = new MessageEmbed()
		.setColor(colors.default)
		.setTitle(`Hi, I'm ${this.client.user.username}.`)
		.setDescription(stripIndents`

		First off, this is a private bot - it's not online 24/7. This is my first project ever so if you find some bugs let me know and I'll try to fix them ASAP.

		**❯** To get started type \`${this.client.prefix}help\`.
		**❯** To get information about a command type \`${this.client.prefix}help <command>\`.
		**❯** To set your logs channel type \`${this.client.prefix}logs\`. Use \`${this.client.prefix}logs delete\` to remove it.
		**❯** To change prefix for your server type \`${this.client.prefix}prefix <prefix>\`. Use \`<prefix>prefix default\` to change it back to default prefix.
		**❯** To set autorole for your server type \`${this.client.prefix}autorole <role name | role id>\`. Use \`${this.client.prefix}autorole delete\` to remove it.

		**❯** Join our Discord: https://discord.gg/KD457qA

		***~ ${this.client.users.cache.find(user => user.id === this.client.owner).tag}***
		`)

		channel.send(embed);
		
		this.client.logger.info(`Joined server ${guild.name} with ${guild.memberCount} members.`);
        
	}
}