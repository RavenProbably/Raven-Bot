const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');
const { stripIndents } = require('common-tags');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['clear'],
            description: 'Purges messages.',
            category: 'moderation',
            usage: '<amount>'
        });
    }

    run(message, args) {

        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You don\'t have permission to use this command.');
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.reply('I don\'t have permission to delete messages!');

        if (isNaN(args[0])) return message.reply('You need to input a valid number.');
        if (args[0] > 100) return message.reply('You can only purge maximum of 100 messages at a time.');

        message.channel.bulkDelete(args[0]).then(messages => message.channel.send(`Successfully deleted **${messages.size}** of **${args[0]}** messages.`).then(() => {

            const logs = this.client.database.getLogs(message.guild.id);

            if (!logs) {

                return;

            } else {

                const embed = new MessageEmbed()
                .setColor(colors.orange)
                .setAuthor(`Messages Purged`)
                .setTitle(message.member.user.tag, message.member.user.displayAvatarURL({ dynamic: true }))
                .setDescription(stripIndents`
                **❯ Message Count:** ${args[0]}
                **❯ Channel:** ${message.channel}
                **❯ Moderator:** ${message.member}
                `)
                .setFooter(`${message.guild.name} Logs`, message.guild.iconURL())
                .setTimestamp()
    
                let channel = message.guild.channels.cache.find(ch => ch.name === logs.channelname);
                channel.send(embed);

            };

        })).catch(error => {

            message.reply(error.message.replace('bulk delete', 'purge'));

        });

    }
}