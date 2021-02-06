const Command = require('../../structures/Command');
const numeral = require('numeral');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['send'],
            description: 'Allows you to make a payment.',
            category: 'economy',
            usage: '<user> <amount>'
        });
    }

    run(message, args) {

        let amount;

        amount = Number(args[1]);

        if (!amount) return message.reply('You need to provide an amount of coins!');

        if (!message.mentions.users.size) return message.reply('You need to provide an user!');

        let user = message.mentions.users.first();

        let coins = this.client.database.getCoins(message.author.id);

        if (!coins) return message.reply('You don\'t have any coins!');
        if (coins < amount) return message.reply('You don\'t have enough coins!');

        this.client.database.chargeCoins(message.author.id, amount);
        this.client.database.payCoins(user.id, amount);

        message.reply(`Successfully paid **${numeral(amount).format('0,0')}** ${this.client.utils.isMultiple(amount) ? 'coins' : 'coin'} to ${user}.`);
        
    }
}