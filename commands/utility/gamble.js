const Command = require('../../structures/Command');
const numeral = require('numeral');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['gam'],
            description: 'Displays user\'s gamble information.',
            category: 'utility',
            usage: '[command | user]'
        });
    }

    run(message) {

        if (!message.mentions.users.size) {

            let wins = this.client.database.getGamble(message.author.id) ? numeral(this.client.database.getGamble(message.author.id).wins).format('0,0') : 0;
            let games = this.client.database.getGamble(message.author.id) ? numeral(this.client.database.getGamble(message.author.id).games).format('0,0') : 0;
            let winrate = !isNaN(this.client.utils.winPercentage(wins, games)) ? `${this.client.utils.winPercentage(wins, games)}%` : false;
            let lost = numeral(this.client.database.getGamble(message.author.id).lost).format('0,0') || 0;

            if (winrate) {

                return message.reply(`You played **${games}** games, won **${wins}** of them, your winrate is **${winrate}** & you lost **${lost}** coins.`);

            } else {

                return message.reply(`You haven't played any games yet!`);

            };

        } else {

            let user = message.mentions.users.first();

            let wins = this.client.database.getGamble(user.id) ? numeral(this.client.database.getGamble(user.id).wins).format('0,0') : 0;
            let games = this.client.database.getGamble(user.id) ? numeral(this.client.database.getGamble(user.id).games).format('0,0') : 0;
            let winrate = !isNaN(this.client.utils.winPercentage(wins, games)) ? `${this.client.utils.winPercentage(wins, games)}%` : false;
            let lost = this.client.database.getGamble(user.id) ? numeral(this.client.database.getGamble(user.id).lost).format('0,0') : 0;

            if (winrate) {

                return message.reply(`${user} played **${games}** games, won **${wins}** of them, his / her winrate is **${winrate}** & he / she lost **${lost}** coins.`);

            } else {

                return message.reply(`${user} haven't played any games yet!`);

            };
            
        };

    }
}