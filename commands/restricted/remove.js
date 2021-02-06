const Command = require('../../structures/Command');
const numeral = require('numeral');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'Removes coins to user\'s balance.',
            category: 'restricted',
            usage: '<user> <amount>'
		});
	}

	run(message, args) {

        if (message.author.id !== this.client.owner) return message.reply('You don\'t have permission to use this command.');

        let user = message.mentions.users.first();

        if (!user) return message.reply('You need to provide an user!');
      
        let amount = Number(args[1]);

        if (amount === 0 || 0 > amount) return message.reply('Amount shouldn\'t be zero or less!');
        
        this.client.database.chargeCoins(user.id, amount);

        message.delete();

        message.channel.send(`Removed **${numeral(amount).format('0,0')}** ${this.client.utils.isMultiple(amount) ? 'coins' : 'coin'} from ${user}.`);
        
    }
}