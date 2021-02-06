const Command = require('../../structures/Command');
const numeral = require('numeral');
const shop = require('../../shop.json');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['title'],
            description: 'Allows you to set a bio for your profile.',
            category: 'utility',
            usage: '<bio>'
        });
    }

    run(message, args) {

        let bio = this.client.utils.capitaliseFirst(args.join(' '));

        let maxLength = 64;

        if (!bio) return message.reply('You need to provide a bio!');
        if (bio.length > maxLength) return message.reply(`Bio shouldn\'t be longer than **${maxLength}** characters.`);

        let amount = shop.prices.bio;

        let coins = this.client.database.getCoins(message.author.id);

        if (!coins) return message.reply('You don\'t have any coins!');
        if (coins < amount) return message.reply('You don\'t have enough coins!');

        this.client.database.insertBio(message.author.id, bio);
        
        this.client.database.chargeCoins(message.author.id, amount);
        
        message.reply(`Successfully set **${bio}** as your bio.`);
        message.reply(`**${numeral(amount).format('0,0')}** ${this.client.utils.isMultiple(amount) ? 'coins' : 'coin'} has been successfully charged from your account.`);

    }
}