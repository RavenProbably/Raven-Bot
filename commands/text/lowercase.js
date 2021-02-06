const Command = require('../../structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['lower', 'low'],
			description: 'Allows you to convert text to lowercase.',
            category: 'text',
            usage: '<text>'
		});
	}

	run(message, args) {

		if (!args[0]) return message.reply('You need to provide a text!');

		message.reply(`Here is your converted text: \`${args.join(' ').toLowerCase()}\`.`);

    }
}