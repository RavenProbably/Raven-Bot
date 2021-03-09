const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');
const { stripIndents } = require('common-tags');
const ms = require('ms');
const numeral = require('numeral');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['prf'],
            description: 'Displays user\'s profile.',
            category: 'utility',
            usage: '[command | user]'
        });
    }

    run(message) {

        const client = this.client;

        let user = message.mentions.users.first() || message.author;

        let xp = numeral(this.client.database.getXp(user.id)).format('0,0') || 0;
        let lvl = this.client.database.getLvl(user.id) || 0;
        let prestige = numeral(this.client.database.getPrestige(user.id)).format('0,0') || 0;
        let coins = numeral((this.client.database.getCoins(user.id))).format('0,0') || 0;
        let bio = this.client.database.getBio(user.id) || 'No bio';
        let color = this.client.database.getColor(user.id) || colors.white;
        let claimed = this.client.database.getDailyClaims(user.id) || 0;
        let bond = this.client.database.getBond(user.id);
        let messages = numeral(this.client.database.getMessages(user.id)).format('0,0') || 0;
        let wins = this.client.database.getGamble(user.id) ? this.client.database.getGamble(user.id).wins : 0;
        let games = this.client.database.getGamble(user.id) ? this.client.database.getGamble(user.id).games : 0;
        let winrate = !isNaN(this.client.utils.winPercentage(wins, games)) ? `${this.client.utils.winPercentage(wins, games)}%` : 'Never Played';
        let lost = this.client.database.getGamble(user.id) ? numeral(this.client.database.getGamble(user.id).lost).format('0,0') : 0;
        let gems = numeral((this.client.database.getGems(user.id))).format('0,0') || 0;
        let gemsTotal = this.client.database.getGems(user.id) * 500 || 0;
        let coinsTotal = this.client.database.getCoins(user.id) || 0;
        let total = numeral(gemsTotal + coinsTotal).format('0,0') || 0;
        let booster = this.client.database.getBooster(user.id) ? this.client.database.getBooster(user.id) : false;

        const embed = new MessageEmbed()
        .setColor(color)
        .setAuthor(`Profile`, client.user.displayAvatarURL())
        .setThumbnail(user.displayAvatarURL())
        .setTitle(user.tag)
        .setDescription(bio)
        .addField('General', stripIndents`
        **❯ XP:** ${xp}
        **❯ Level:** ${lvl}
        **❯ Prestige:** ${prestige}
        `, true)
        .addField('Balance', stripIndents`
        **❯ Coins:** ${coins}
        **❯ Gems:** ${gems}
        **❯ Total:** ${total}
        `, true)
        .addField('Activity', stripIndents`
        **❯ Messages Sent:** ${messages}
        **❯ Dailies Claimed:** ${claimed}
        `, true)
        .addField('Gamble', stripIndents`
        **❯ Winrate:** ${winrate}
        **❯ Games Played:** ${games}
        **❯ Games Won:** ${wins}
        **❯ Coins Lost:** ${lost}
        `, true)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp()

        if (booster) {
            embed.addField('Booster', stripIndents`
            **❯ Type:** ${booster.type}
            **❯ Expiration:** ${ms(booster.end - Date.now(), { long: true })}
            `)
        };

        return message.channel.send(embed);

    }
}