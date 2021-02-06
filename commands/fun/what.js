const Command = require('../../structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['why', 'where', 'when', 'who'],
			description: 'What?',
            category: 'fun',
            usage: '[command]'
		});
	}

	run(message) {

        let replies = [
            'I have no idea', 'I don\'t know', 'What?', 'Ask your mom', 'Ask your dad', 'What?'
        ];
    
        const random = Math.floor(Math.random() * replies.length);
    
        message.channel.send(`${replies[random]}, ${message.author}.`);

    }
}