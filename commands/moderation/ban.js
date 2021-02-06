const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');
const { stripIndents } = require('common-tags');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['b'],
			description: 'Allows you to ban an user.',
            category: 'moderation',
            usage: '<user> [days]'
		});
	}

	run(message, args) {

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You don\'t have permission to use this command.');
        if (!message.guild.me.hasPermission('ADMINISTRATOR')) return message.reply('I don\'t have permission to execute this command!');

        let user = message.mentions.users.first();

        const logs = this.client.database.getLogs(message.guild.id);

        let days = args[1] || 7;

        if (!user) return message.reply('You need to provide an user!');

        message.guild.members.ban(user, { days: days });

        message.channel.send(`**${user.tag}** has been banned by **${message.author.tag}** for **${days} days**.`);

        const embed = new MessageEmbed()
        .setColor(colors.orange)
        .setAuthor(`User Banned`)
        .setTitle(user.tag, user.displayAvatarURL({ dynamic: true }))
        .setDescription(stripIndents`
        **❯ User:** ${user.tag}
        **❯ Moderator:** ${message.author.tag}
        **❯ Days:** ${days}
        `)
        .setFooter(`${message.guild.name} Logs`, message.guild.iconURL())
        .setTimestamp()

        let channel = message.guild.channels.cache.find(ch => ch.name === logs.channelname);
        channel.send(embed);

    }
}