const Command = require('../../structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['pp', 'penis'],
			description: 'Reveals the truth.',
            category: 'fun',
            usage: '[command | user]'
		});
	}

	run(message) {

		let randomNumber = Math.floor(Math.random() * 48) + 1;

        if (!message.mentions.users.size) {

            message.reply(`Your pp is **${randomNumber}cm** long.`);
    
        } else {

            let user = message.mentions.users.first();
   
            message.channel.send(`${user}'s pp is **${randomNumber}cm** long.`);

        };

    }
}