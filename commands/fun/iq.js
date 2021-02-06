const Command = require('../../structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['iqrate', 'intelligence'],
			description: 'Rates how intelligent user is.',
            category: 'fun',
            usage: '[command | user]'
		});
	}

	run(message) {

        let randomNumber = Math.floor(Math.random() * 230) + 1;

        if (!message.mentions.users.size) {

            message.reply(`You have **${randomNumber}** IQ.`);
    
        } else {

            let user = message.mentions.users.first();
   
            message.channel.send(`${user} has **${randomNumber}** IQ.`);

        };

    }
}