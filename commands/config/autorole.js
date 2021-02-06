const Command = require('../../structures/Command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['ar', 'role'],
            description: 'Allows you to set autorole for your server.',
            category: 'config',
            usage: '<role>'
        });
    }

    run(message, args) {

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You don\'t have permission to use this command.');
        if (!message.guild.me.hasPermission('ADMINISTRATOR')) return message.reply('I don\'t have permission to execute this command!');

        if (!args[0]) return message.reply('You need to provide a role name or ID!');

        let role = message.guild.roles.cache.find(role => role.name === args[0]) || message.guild.roles.cache.get(args[0]);

        if (role) {

            this.client.database.addAutorole(message.guild.id, role.name, role.id);

            return message.channel.send(`Successfully set **${role.name}** as autorole role.`);

        };

        if (args[0].toLowerCase() === 'delete') {

            let storedRole = this.client.database.getAutorole(message.guild.id) ? this.client.database.getAutorole(message.guild.id).rolename : undefined;

            if (storedRole === undefined) return message.reply(`There is nothing to delete.`);

            this.client.database.deleteAutorole(message.guild.id);

            return message.channel.send(`Successfully removed **${storedRole}** as autorole role.`);

        };

        if (!role) {

            return message.reply(`You need to provide a role name or ID!`);

        };
        
    }
}