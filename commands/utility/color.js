const Command = require('../../structures/Command');
const colors = require('../../colors.json');
const { stripIndents } = require('common-tags');
const numeral = require('numeral');
const shop = require('../../shop.json');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['colour', 'col'],
            description: 'Allows you to set a color for your profile embed.',
            category: 'utility',
            usage: '<hex code | preset name>'
        });
    }

    run(message, args) {

        const presets = JSON.parse(JSON.stringify(colors));

        let hex = presets[args[0]] ? presets[args[0]] : args[0];

        if (!hex) return message.reply(stripIndents`You need to provide a hex code or color name:
        \`\`\`${presets}\`\`\`
        `);

        if (!hex.startsWith('#')) return message.reply('Hex code should start with **#**.');
        if (hex.length > 7) return message.reply('Hex code can\'t be longer than 6 characters.');

        let amount = shop.prices.color;

        let coins = this.client.database.getCoins(message.author.id);

        if (!coins) return message.reply('You don\'t have any coins!');
        if (coins < amount) return message.reply('You don\'t have enough coins!');

        this.client.database.insertColor(message.author.id, hex);
        
        this.client.database.chargeCoins(message.author.id, amount);

        message.reply(`Successfully set **${hex}** as your color.`);
        message.reply(`**${numeral(amount).format('0,0')}** ${this.client.utils.isMultiple(amount) ? 'coins' : 'coin'} has been successfully charged from your account.`);

    }
}