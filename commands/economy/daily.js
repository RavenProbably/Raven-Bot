const Command = require('../../structures/Command');
const numeral = require('numeral');
const ms = require('ms');
const { stripIndents } = require('common-tags')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['claim', 'da', 'dl'],
			description: 'Allows you to claim daily reward.',
            category: 'economy',
            usage: '[command]'
		});
	}

	run(message) {

        const nextClaim = this.client.database.getDaily(message.author.id) || 0;

        const prestige = this.client.database.getPrestige(message.author.id)

        let now = Date.now();

        let tomorrow = new Date().setHours(23,59,59,999);

        let timeTilClaim = tomorrow - now;

        if (now > nextClaim || !nextClaim) {

            this.client.database.payCoins(message.author.id, (prestige === 0 ? 1 : prestige) * 500);

            message.reply(stripIndents`
            Successfully claimed daily reward of **${numeral((prestige === 0 ? 1 : prestige) * 500).format('0,0')}** coins!
            *Next claim will be available tomorrow.*
            `);

            this.client.database.setDaily(message.author.id, now, tomorrow, 1);

        };

        if (now < nextClaim) {

            message.reply(`You need to wait **${ms(timeTilClaim, { long: true })}** til you can claim daily reward again!`);
            
        };
        
    }
}