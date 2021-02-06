const Command = require('../../structures/Command');
const moment = require('moment');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'Displays current date.',
            category: 'utility',
            usage: '[command]'
		});
	}

	run(message) {

		let date = moment().format('MMMM Do YYYY');

        message.reply(`Today is **${date}**.`);

    }
}