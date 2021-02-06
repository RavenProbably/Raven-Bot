const Command = require('../../structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'Displays current year progress.',
            category: 'utility',
            usage: '[command]'
		});
	}

	run(message) {

		let today = new Date();
		let start = new Date(today.getFullYear(), 0, 1);
		let end = new Date(today.getFullYear() + 1, 0, 1);

		let progress = Math.floor(Math.abs(today - start) / Math.abs(end - start) * 100);
		
		message.reply(`The year **${today.getFullYear()}** is **${progress}%** complete.`);

    }
}