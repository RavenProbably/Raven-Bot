const Command = require('../../structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['rt'],
			description: 'Rates user from 1 to 10.',
            category: 'fun',
            usage: '[command | user]'
		});
	}

	run(message) {

		let randomNumber = Math.floor(Math.random() * 10) + 1;

		if (!message.mentions.users.size) {
   
            message.reply(`You are **${randomNumber} / 10**.`);
    
        } else {

            let user = message.mentions.users.first();
   
            message.reply(`${user} is **${randomNumber} / 10**.`);

        };

    }
}