const Command = require('../../structures/Command');
const numeral = require('numeral');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['bal', 'coins', 'gems', 'wallet'],
            description: 'Displays user\'s balance.',
            category: 'economy',
            usage: '[command | user]'
        });
    }

    run(message) {

        if (!message.mentions.users.size) {

            let coins = this.client.database.getCoins(message.author.id) || 0;
            let gems = this.client.database.getGems(message.author.id) || 0;

            return message.reply(`You have **${numeral(coins).format('0,0')}** ${this.client.utils.isMultiple(coins) ? 'coins' : 'coin'} & **${numeral(gems).format('0,0')}** ${this.client.utils.isMultiple(gems) ? 'gems' : 'gem'}.`);

        } else {

            let user = message.mentions.users.first();
            
            let coins = this.client.database.getCoins(user.id) || 0;
            let gems = this.client.database.getGems(user.id) || 0;

            return message.channel.send(`${user} has **${numeral(coins).format('0,0')}** ${this.client.utils.isMultiple(coins) ? 'coins' : 'coin'} & **${numeral(gems).format('0,0')}** ${this.client.utils.isMultiple(gems) ? 'gems' : 'gem'}.`);

        };

    }
}