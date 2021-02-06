const Event = require('../structures/Event');
const { MessageEmbed, version } = require('discord.js');
const colors = require('../colors.json');
const { stripIndents } = require('common-tags');

module.exports = class extends Event {

	async run(message) {
		
		if (!message.guild || message.author.bot) return;

		const attachments = message.attachments.size ? message.attachments.map(attachment => attachment.proxyURL) : null;

		const logs = this.client.database.getLogs(message.guild.id);

		if (!logs) {

			return;
			
		} else {

			const mentionRegexPrefix = RegExp(`^<@!${this.client.user.id}> `);
	
			const prefix = this.client.database.getPrefix(message.guild.id) ? this.client.database.getPrefix(message.guild.id) : this.client.prefix;
	
			const finalPrefix = message.content.match(mentionRegexPrefix) ? message.content.match(mentionRegexPrefix)[0] : prefix;

			const cmd = message.content.slice(finalPrefix.length).trim().split(/ +/g);

			const command = this.client.commands.get(cmd[0].toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd[0].toLowerCase()));

			if (command) {

				return;

			} else {

				const embed = new MessageEmbed()
				.setColor(colors.orange)
				.setAuthor(`Message Deleted`)
				.setTitle(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
				.setDescription(stripIndents`
				**❯ Message ID:** ${message.id}
				**❯ Channel:** ${message.channel}
				**❯ Author:** ${message.member}
				${attachments ? `**❯ Attachments:** ${attachments.join('\n')}` : ''}
				`)
				.setFooter(`${message.guild.name} Logs`, message.guild.iconURL())
				.setTimestamp()
	
				if (message.content.length) {
					embed.addField(`**❯ Deleted Message Content:**`, `${message.content}`);
				}
	
				let channel = message.guild.channels.cache.find(ch => ch.name === logs.channelname);
				channel.send(embed);

			};
	
		};     
	}
}