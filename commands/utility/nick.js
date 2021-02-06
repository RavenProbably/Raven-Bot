const Command = require('../../structures/Command');
const numeral = require('numeral');
const shop = require('../../shop.json');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['nickname', 'username'],
            description: 'Allows you to change your nickname for gems.',
            category: 'utility',
            usage: '<nick>',
            availability: 'Guild'
        });
    }

    run(message, args) {

        let nick = args.join(' ');

        let maxLength = 32;

        if (!nick) return message.reply('You need to provide a nickname!');
        if (nick.length > maxLength) return message.reply(`Nickname shouldn\'t be longer than **${maxLength}** characters.`);

        if (message.guild.id !== this.client.guild) return message.reply(`You need to be a member of **${this.client.guilds.cache.get(this.client.guild).name}** Discord server to use this command.`);

        let amount = shop.prices.nick;

        let gems = this.client.database.getGems(message.author.id);

        if (!gems) return message.reply('You don\'t have any gems!');
        if (gems < amount) return message.reply('You don\'t have enough gems!');

        message.guild.members.cache.get(message.author.id).setNickname(nick);
        
        this.client.database.chargeGems(message.author.id, amount);
        
        message.reply(`Successfully set **${nick}** as your nickname.`);
        message.reply(`**${numeral(amount).format('0,0')}** ${this.client.utils.isMultiple(amount) ? 'gems' : 'gem'} has been successfully charged from your account.`);

    }
}