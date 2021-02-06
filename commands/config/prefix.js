const Command = require('../../structures/Command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['pre', 'fix'],
            description: 'Allows you to set custom prefix for your server.',
            category: 'config',
            usage: '<prefix>'
        });
    }

    run(message, args) {

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You don\'t have permission to use this command.');
        if (!message.guild.me.hasPermission('ADMINISTRATOR')) return message.reply('I don\'t have permission to execute this command!');

        if (!args[0]) return message.reply('You need to provide a prefix!');

        if (args[0].toLowerCase() === 'default') {

            this.client.database.deletePrefix(message.guild.id);

            return message.channel.send(`Successfully set **${this.client.prefix}** as ${this.client.user.username}'s prefix.`);

        };

        if (args[0].length > 6) return message.reply('Prefix shouldn\'t be longer than 6 characters!');

        this.client.database.addPrefix(message.guild.id, args[0]);

        message.channel.send(`Successfully set **${args[0]}** as ${this.client.user.username}'s prefix.`);

    }
}