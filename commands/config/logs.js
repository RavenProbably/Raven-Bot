const Command = require('../../structures/Command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['log', 'modlogs', 'logging'],
            description: 'Allows you to set logs channel for your server.',
            category: 'config',
            usage: '[command]'
        });
    }

    run(message, args) {

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You don\'t have permission to use this command.');
        if (!message.guild.me.hasPermission('ADMINISTRATOR')) return message.reply('I don\'t have permission to execute this command!');

        if (!args[0]) {

            this.client.database.addLogs(message.guild.id, message.channel.name, message.channel.id);

            return message.channel.send(`Successfully set **${message.channel}** as logs channel.`);

        };

        if (args[0].toLowerCase() === 'delete') {

            let channel = this.client.database.getLogs(message.guild.id) ? this.client.channels.cache.find(channel => channel.name === this.client.database.getLogs(message.guild.id).channelname) : undefined;

            if (channel === undefined) return message.reply(`There is nothing to delete.`);

            this.client.database.deleteLogs(message.guild.id);

            return message.channel.send(`Successfully removed **${channel}** as logs channel.`);

        };

    }
}