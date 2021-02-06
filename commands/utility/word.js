const Command = require('../../structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['roll'],
			description: 'Chooses random word from selection.',
            category: 'utility',
            usage: '<words>'
		});
	}

	run(message, args) {

        if (!args[0]) return message.reply('You need to provide a word!');
        if (!args[1]) return message.reply('You need to provide multiple words!');

        const random = Math.floor(Math.random() * args.length);
    
        const word = args[random];

        message.reply(`I choose **${word}**!`);

    }
}