const Command = require('../../structures/Command');
const moment = require('moment');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['today'],
			description: 'Displays current day.',
            category: 'utility',
            usage: '[command]'
		});
	}

	run(message) {

		let day = moment().format('dddd');

        message.reply(`Today is **${day}**.`);

    }
}