const Command = require('../../structures/Command');
const { stripIndents } = require('common-tags');
const numeral = require('numeral');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['rl', 'spin'],
			description: 'Allows you to bid on a roulette.',
            category: 'fun',
            usage: '<amount> <color>'
		});
	}

	run(message, args) {

        let color;

        let spin = Math.random() * 100;
        
        if (spin < 47.5) {

            color = 'black';

        };

        if (spin > 47.5 && spin < 95) {

            color = 'red';

        };

        if (spin > 95) {

            color = 'green';

        };

        let amount = Number(args[0]);

        if (!amount) return message.reply('You need to provide an amount of coins!');

        let coins = this.client.database.getCoins(message.author.id) || 0;

        if (!args[1]) return message.reply(stripIndents`You need to provide a color:
        - Use \`red\` to bid on red *(50%)*
        - Use \`black\` to bid on black *(50%)*
        - Use \`green\` to bid on green *(5%)*
        `);

        if (args[1].toLowerCase() === 'red' || args[1].toLowerCase() === 'black' || args[1].toLowerCase() === 'green') {

            if (!coins) return message.reply('You don\'t have any coins!');
            if (coins < amount) return message.reply('You don\'t have enough coins!');
    
            if (color === args[1].toLowerCase()) {

                message.channel.send('Spinning wheel...').then(msg => {

                    msg.delete({ timeout: 3000 });

                }).then(() => {

                    setTimeout(() => {

                        let xpAdd = 25;

                        this.client.database.addXp(message.author.id, xpAdd);

                        this.client.database.addGambleGame(message.author.id);

                        this.client.database.addGambleWin(message.author.id);
            
                        this.client.logger.report(message.author.tag, xpAdd, 'xp');

                        message.reply(`I spinned: \`${color}\` - **You won**!`);

                        if (color === 'green' && args[1].toLowerCase() === 'green') {
                            
                            this.client.database.payCoins(message.author.id, amount * 50);
                            message.reply(`**${numeral(amount * 50).format('0,0')}** coins have been added to your account.`);

                        } else {

                            this.client.database.payCoins(message.author.id, amount);
                            message.reply(`**${numeral(amount).format('0,0')}** coins have been added to your account.`);

                        };

                    }, 3000);

                });
            } else {

                message.channel.send('Spinning wheel...').then(msg => {

                    msg.delete({ timeout: 3000 });

                }).then(() => {

                    setTimeout(() => {

                        this.client.database.addGambleGame(message.author.id);

                        this.client.database.addGambleLost(message.author.id, amount);

                        message.reply(`I spinned: \`${color}\` - **You lost**!`);

                        if (amount) {

                            this.client.database.chargeCoins(message.author.id, amount);
                            message.reply(`**${numeral(amount).format('0,0')}** coins have been charged from your account.`);

                        };

                    }, 3000);
                    
                });
            };

        } else {

            return message.reply(stripIndents`You need to provide a color:
            - Use \`red\` to bid on red *(50%)*
            - Use \`black\` to bid on black *(50%)*
            - Use \`green\` to bid on green *(5%)*
            `);

        };

    }
}