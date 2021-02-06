const Command = require('../../structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'Allows you to convert text to text with clap emoji in between.',
            category: 'text',
            usage: '<text>'
		});
	}

	run(message, args) {

		if (!args[0]) return message.reply('You need to provide a text!');

		message.reply(`Here is your converted text: \`${args.join(' 👏 ')}\`.`);

    }
}