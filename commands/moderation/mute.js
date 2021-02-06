const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');
const { stripIndents } = require('common-tags');
const ms = require('ms');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['silence', 'sil'],
			description: 'Allows you to mute an user.',
            category: 'moderation',
            usage: '<user> [time]'
		});
	}

	run(message, args) {

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You don\'t have permission to use this command.');
        if (!message.guild.me.hasPermission('ADMINISTRATOR')) return message.reply('I don\'t have permission to execute this command!');

        let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted');

        if (!role) return message.reply('I couldn\'t find a mute role!');

        let user = message.mentions.users.first();

        let member = message.guild.members.cache.get(user.id);

        const logs = this.client.database.getLogs(message.guild.id);

        const embed = new MessageEmbed()
        .setFooter(`${message.guild.name} Logs`, message.guild.iconURL())
        .setTimestamp()

        if (!user) return message.reply('You need to provide an user!');

        if (!args[1]) {

            if (member.roles.cache.some(role => role.name.toLowerCase() === 'muted')) {

                member.roles.remove(role);

                message.channel.send(`**${user.tag}** has been unmuted by **${message.author.tag}**.`);

                embed.setColor(colors.orange);
                embed.setAuthor(`User Unmuted`)
                embed.setTitle(user.tag, user.displayAvatarURL({ dynamic: true }));
                embed.setDescription(stripIndents`
                **❯ User:** ${user.tag}
                **❯ Moderator:** ${message.author.tag}
                `);
    
                let channel = message.guild.channels.cache.find(ch => ch.name === logs.channelname);
                channel.send(embed);

            } else {

                member.roles.add(role);

                message.channel.send(`**${user.tag}** has been muted by **${message.author.tag}**.`);

                embed.setColor(colors.orange);
                embed.setAuthor(`User Muted`)
                embed.setTitle(user.tag, user.displayAvatarURL({ dynamic: true }));
                embed.setDescription(stripIndents`
                **❯ User:** ${user.tag}
                **❯ Moderator:** ${message.author.tag}
                `);
    
                let channel = message.guild.channels.cache.find(ch => ch.name === logs.channelname);
                channel.send(embed);

            }
        };

        if (args[1]) {

            let time = ms(args[1]);

            if (!time) return message.reply('You need to provide a valid time format!');

            member.roles.add(role);

            this.client.database.addMute(user.tag, user.id, Date.now(), Date.now() + time);

            let mute = this.client.database.getMute(user.id);

            message.channel.send(`**${user.tag}** has been muted by **${message.author.tag}** for **${ms(time, { long: true })}**.`);

            if (!logs) {
    
                return;
                
            } else {
                
                embed.setColor(colors.orange);
                embed.setAuthor(`User Muted`)
                embed.setTitle(user.tag, user.displayAvatarURL({ dynamic: true }));
                embed.setDescription(stripIndents`
                **❯ User:** ${user.tag}
                **❯ Moderator:** ${message.author.tag}
                **❯ Time:** ${ms(time, { long: true })}
                `);
    
                let channel = message.guild.channels.cache.find(ch => ch.name === logs.channelname);
                channel.send(embed);

            };
            
            const interval = setInterval(() => {

                if (Date.now() > mute.end) {

                    this.client.database.deleteMute(user.id);
                    member.roles.remove(role);
                    clearInterval(interval);

                    embed.setColor(colors.green);
                    embed.setAuthor(`User Automatically Unmuted`);
                    embed.setTitle(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    embed.setDescription(stripIndents`
                    **❯ User:** ${user.tag}
                    **❯ Moderator:** ${message.author.tag}
                    **❯ Time:** ${ms(time, { long: true })}
                    `);

                    let channel = message.guild.channels.cache.find(ch => ch.name === logs.channelname);
                    channel.send(embed);

                };

            }, 1000);

        };

    }
}