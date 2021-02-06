const Event = require('../structures/Event');
const { MessageEmbed, Util: { escapeMarkdown } } = require('discord.js');
const { diffWordsWithSpace } = require('diff');
const colors = require('../colors.json');
const { stripIndents } = require('common-tags');

module.exports = class extends Event {

	async run(message, old) {
		
		if (!message.guild || old.content === message.content || message.author.bot) return;

		const logs = this.client.database.getLogs(message.guild.id);

		if (!logs) {
			
			return;

		} else {

			const embed = new MessageEmbed()
			.setColor(colors.orange)
			.setAuthor(`Message Updated`)
			.setTitle(old.author.tag, old.author.displayAvatarURL({ dynamic: true }))
			.setDescription(stripIndents`
			**❯ Message ID:** ${old.id}
			**❯ Channel:** ${old.channel}
			**❯ Author:** ${old.author.tag} (${old.author.id})
			`)
			.setFooter(`${message.guild.name} Logs`, message.guild.iconURL())
			.setTimestamp()
			.setURL(old.url)
			.addField(`**❯ Updated Message Content:**`, diffWordsWithSpace(escapeMarkdown(old.content), escapeMarkdown(message.content))
			.map(result => result.added ? `**${result.value}**` : result.removed ? `~~${result.value}~~` : `${result.value}`)
			.join(' '));

			let channel = message.guild.channels.cache.find(ch => ch.name === logs.channelname);
			channel.send(embed);
			
		};
	}
}