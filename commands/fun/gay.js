const Command = require('../../structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['gayrate'],
			description: 'Rates how gay user is.',
            category: 'fun',
            usage: '[command | user]'
		});
	}

	run(message) {

        let randomNumber = Math.floor(Math.random() * 100) + 1;

        if (!message.mentions.users.size) {

            message.reply(`You are **${randomNumber}%** gay.`);
    
        } else {

            let user = message.mentions.users.first();
   
            message.channel.send(`${user} is **${randomNumber}%** gay.`);

        };

    }
}