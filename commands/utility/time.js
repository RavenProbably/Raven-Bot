const Command = require('../../structures/Command');
const moment = require('moment');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['clock'],
			description: 'Displays current time.',
            category: 'utility',
            usage: '[command]'
		});
	}

	run(message) {

        let time = moment().format('h:mm:ss a');

        message.reply(`It's **${time}**.`);

    }
}