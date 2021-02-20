const Command = require('../../structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'Displays character count of text.',
            category: 'text',
            usage: '<text>'
		});
	}

	run(message, args) {

		if (!args[0]) return message.reply('You need to provide a text!');

		let characterCount = this.client.utils.countCharacters(args.join(' '));

        message.reply(`There is **${characterCount}** ${this.client.utils.isMultiple(characterCount) ? 'characters' : 'character'} in that text.`);

    }
}