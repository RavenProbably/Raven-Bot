const Command = require('../../structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['hi', 'hey'],
			description: 'Hi, I\'m Negan.',
            category: 'fun',
            usage: '[command]'
		});
	}

	run(message) {

        let replies = [
            'Hi', 'Hello', 'Wassup', 'Yo', 'No', 'Howdy'
        ];
    
        const random = Math.floor(Math.random() * replies.length);
    
        message.channel.send(`${replies[random]}, ${message.author}.`);

    }
}