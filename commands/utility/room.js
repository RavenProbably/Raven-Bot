const Command = require('../../structures/Command');
const numeral = require('numeral');
const shop = require('../../shop.json');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['vr', 'voice'],
            description: 'Allows you to create your own voice room for gems.',
            category: 'utility',
            usage: '[user limit]',
            availability: 'Guild'
        });
    }

    run(message, args) {

        if (message.guild.id !== this.client.guild) return message.reply(`You need to be a member of **${this.client.guilds.cache.get(this.client.guild).name}** Discord server to use this command.`);

        let amount = shop.prices.room;

        let gems = this.client.database.getGems(message.author.id);

        if (!gems) return message.reply('You don\'t have any gems!');
        if (gems < amount) return message.reply('You don\'t have enough gems!');

        message.guild.channels.create(message.author.username, { type: 'voice', parent: '788068333802881024', userLimit: Number(args[0]) });
        
        this.client.database.chargeGems(message.author.id, amount);

        message.reply(`Successfully created your voice room.`);
        message.reply(`**${numeral(amount).format('0,0')}** ${this.client.utils.isMultiple(amount) ? 'gems' : 'gem'} has been successfully charged from your account.`);

    }
}