const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');
const { stripIndents } = require('common-tags');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['unb', 'ub'],
			description: 'Allows you to unban an user.',
            category: 'moderation',
            usage: '<user id>'
		});
	}

	run(message, args) {

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You don\'t have permission to use this command.');
        if (!message.guild.me.hasPermission('ADMINISTRATOR')) return message.reply('I don\'t have permission to execute this command!');

        const logs = this.client.database.getLogs(message.guild.id);

        let id = args[0];

        let regExp = /^\d+$/;

        if (!regExp.test(id)) return message.reply('You need to provide an user ID!');

        message.guild.members.unban(id);

        let user = this.client.users.cache.find(user => user.id === id);

        message.channel.send(`**${user.tag}** has been unbanned by **${message.author.tag}**.`);

        const embed = new MessageEmbed()
        .setColor(colors.orange)
        .setAuthor(`User Unbanned`)
        .setTitle(user.tag, user.displayAvatarURL({ dynamic: true }))
        .setDescription(stripIndents`
        **❯ User:** ${user.tag}
        **❯ Moderator:** ${message.author.tag}
        `)
        .setFooter(`${message.guild.name} Logs`, message.guild.iconURL())
        .setTimestamp()

        let channel = message.guild.channels.cache.find(ch => ch.name === logs.channelname);
        channel.send(embed);

    }
}