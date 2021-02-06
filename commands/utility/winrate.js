const Command = require('../../structures/Command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['wr', 'winratio'],
            description: 'Displays user\'s gamble winrate.',
            category: 'utility',
            usage: '[command | user]'
        });
    }

    run(message) {

        if (!message.mentions.users.size) {

            let wins = this.client.database.getGamble(message.author.id) ? this.client.database.getGamble(message.author.id).wins : 0;
            let games = this.client.database.getGamble(message.author.id) ? this.client.database.getGamble(message.author.id).games : 0;
            let winrate = !isNaN(this.client.utils.winPercentage(wins, games)) ? `${this.client.utils.winPercentage(wins, games)}%` : false;

            if (winrate) {

                return message.reply(`You played **${games}** games & won **${wins}** of them, that means your winrate is **${winrate}**.`);

            } else {

                return message.reply(`You haven't played any games yet!`);

            };

        } else {

            let user = message.mentions.users.first();

            let wins = this.client.database.getGamble(user.id) ? this.client.database.getGamble(user.id).wins : 0;
            let games = this.client.database.getGamble(user.id) ? this.client.database.getGamble(user.id).games : 0;
            let winrate = !isNaN(this.client.utils.winPercentage(wins, games)) ? `${this.client.utils.winPercentage(wins, games)}%` : false;

            if (winrate) {

                return message.reply(`${user} played **${games}** games & won **${wins}** of them, that means his / her winrate is **${winrate}**.`);

            } else {

                return message.reply(`${user} haven't played any games yet!`);

            };
            
        };

    }
}