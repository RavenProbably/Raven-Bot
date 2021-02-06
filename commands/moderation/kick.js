const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');
const { stripIndents } = require('common-tags');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['k'],
			description: 'Allows you to kick an user.',
            category: 'moderation',
            usage: '<user>'
		});
	}

	run(message, args) {

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You don\'t have permission to use this command.');
        if (!message.guild.me.hasPermission('ADMINISTRATOR')) return message.reply('I don\'t have permission to execute this command!');

        let user = message.mentions.users.first();

        let member = message.guild.members.cache.get(user.id);

        const logs = this.client.database.getLogs(message.guild.id);

        if (!user) return message.reply('You need to provide an user!');

        member.kick();

        message.channel.send(`**${user.tag}** has been kicked by **${message.author.tag}**.`);

        const embed = new MessageEmbed()
        .setColor(colors.orange)
        .setAuthor(`User Kicked`)
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