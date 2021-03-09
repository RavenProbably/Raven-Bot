const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/Command');
const colors = require('../../colors.json');
const shop = require('../../shop.json');
const { stripIndents } = require('common-tags');
const numeral = require('numeral');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['buy'],
            description: 'Allows you to buy items for gems.',
            category: 'economy',
            usage: '<item>'
        });
    }

    run(message, args) {

        let prefix = this.client.database.getPrefix(message.guild.id) ? this.client.database.getPrefix(message.guild.id) : this.client.prefix;

        let content = '';

        let i;

        for (i = 0; i < shop.items.length; i++) {
            let item = shop.items[i];

            content += `**${i + 1}.** ${this.client.utils.formatItem(item)} - **${shop.prices[item]}** gems\n`;
        };

        if (!args[0]) {

            const embed = new MessageEmbed()
            .setColor(colors.default)
            .setAuthor(`Shop`, this.client.user.displayAvatarURL())
            .setTitle('Items')
            .addField('Boosters (7 days)', content)
            .addField('Other', stripIndents`
            **1.** NICK CHANGE - Use **${prefix}nick** - **${shop.prices.nick}** gems
            **3.** PROFILE EMBED COLOR - Use **${prefix}color** - **${shop.prices.color}** gems
            **4.** PROFILE EMBED BIO - Use **${prefix}bio** - **${shop.prices.bio}** gems
            `)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp()

            message.channel.send(embed);

        } else if (args[0]) {

            for (i = 0; i < shop.items.length; i++) {
    
                if (args[0] === (i + 1).toString()) {

                    let item = shop.items[Number(args[0]) - 1];

                    let gems = this.client.database.getGems(message.author.id);
                    let booster = this.client.database.getBooster(message.author.id) ? this.client.database.getBooster(message.author.id) : false;

                    if (!gems) return message.reply('You don\'t have any gems!');
                    if (gems < shop.prices[item]) return message.reply('You don\'t have enough gems!');
                    if (booster) return message.reply('You already have booster!');
                    
                    this.client.database.chargeGems(message.author.id, shop.prices[item]);
                    this.client.database.addBooster(message.author.id, this.client.utils.formatItem(item), Date.now() + 604800000);

                    message.reply(`Successfully bought **${this.client.utils.formatItem(item)}** for **${numeral(shop.prices[item]).format('0,0')}** ${this.client.utils.isMultiple(shop.prices[item]) ? 'gems' : 'gem'}.`);

                };

            };

        };
 
    }
}