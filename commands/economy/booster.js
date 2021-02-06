const Command = require('../../structures/Command');
const ms = require('ms');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['boost'],
            description: 'Displays user\'s booster.',
            category: 'economy',
            usage: '[command | user]'
        });
    }

    run(message) {

        if (!message.mentions.users.size) {

            let booster = this.client.database.getBooster(message.author.id) ? this.client.database.getBooster(message.author.id) : false;

            if (booster) {

                return message.reply(`You currently have **${booster.type}** that will expire in **${ms(booster.end - Date.now(), { long: true })}**.`);

            } else {

                return message.reply(`You currently don't have any booster!`);

            };

        } else {

            let user = message.mentions.users.first();
            
            let booster = this.client.database.getBooster(user.id) ? this.client.database.getBooster(user.id) : false;

            if (booster) {

                return message.reply(`${user} currently has **${booster.type}** that will expire in **${ms(booster.end - Date.now(), { long: true })}**.`);

            } else {

                return message.reply(`${user} currently doesn't have any booster!`);

            };

        };

    }
}