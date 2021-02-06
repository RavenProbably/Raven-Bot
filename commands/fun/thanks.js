const Command = require('../../structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['thank', 'ty', 'thx'],
			description: 'You are welcome!',
            category: 'fun',
            usage: '[command]'
		});
	}

	run(message) {

        let replies = [
            'No problem', 'You are welcome', 'No worries', 'Don\'t mention it', 'My pleasure', 'Glad to help'
        ];
    
        const random = Math.floor(Math.random() * replies.length);
    
        message.channel.send(`${replies[random]}, ${message.author}.`);

    }
}