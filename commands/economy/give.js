const Command = require('../../structures/Command');
const numeral = require('numeral');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['gift'],
            description: 'Allows you to give gems.',
            category: 'economy',
            usage: '<user> <amount>'
        });
    }

    run(message, args) {

        let amount;

        amount = Number(args[1]);

        if (!amount) return message.reply('You need to provide an amount of gems!');

        if (!message.mentions.users.size) return message.reply('You need to provide an user!');

        let user = message.mentions.users.first();

        let gems = this.client.database.getGems(message.author.id);

        if (!gems) return message.reply('You don\'t have any gems!');
        if (gems < amount) return message.reply('You don\'t have enough gems!');

        this.client.database.chargeGems(message.author.id, amount);
        this.client.database.payGems(user.id, amount);

        message.reply(`Successfully gave **${numeral(amount).format('0,0')}** ${this.client.utils.isMultiple(amount) ? 'gems' : 'gem'} to ${user}.`);
        
    }
}