const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');
const moment = require('moment');
const { stripIndents } = require('common-tags');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['u', 'ui'],
			description: 'Displays information about user.',
            category: 'utility',
            usage: '[command | user]'
		});
	}

	run(message) {

        let member = message.mentions.members.first() || message.member;

        let isBot = {
            'false': 'No',
            'true': 'Yes'
        };
    
        let roles = member.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1);
        
        const embed = new MessageEmbed()
        .setAuthor(`User Information`)
        .setTitle(member.user.tag)
        .setThumbnail(member.user.displayAvatarURL())
        .setColor(colors.default)
        .addField('User', stripIndents`
        **❯ Username:** ${member.user.username}
        **❯ Discriminator:** ${member.user.discriminator}
        **❯ ID:** ${member.user.id}
        **❯ Joined Discord:** ${moment.utc(message.guild.members.cache.get(member.user.id).user.createdAt).format('dddd, MMMM Do, YYYY')} (${this.client.utils.checkDays(message.guild.members.cache.get(member.user.id).user.createdAt)})
        **❯ Status:** ${this.client.utils.capitaliseFirst(member.user.presence.status)}
        **❯ Game:** ${member.user.presence.game ? user.presence.game.name : 'Not playing a game'}
        **❯ Bot:** ${isBot[member.user.bot]}
        `)
    
        .addField('Member', stripIndents`
        **❯ Joined Server:** ${moment.utc(message.guild.members.cache.get(member.user.id).joinedAt).format('dddd, MMMM Do, YYYY')} (${this.client.utils.checkDays(message.guild.members.cache.get(member.user.id).joinedAt)})
        **❯ Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}
        **❯ Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}
        **❯ Roles [${roles.length}] :** ${roles.join(', ')}
        `)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp()
    
        message.channel.send(embed);

    }
}