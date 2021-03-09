const Command = require('../../structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'Displays current age of someone based on the year of birth.',
            category: 'utility',
            usage: '<year>'
		});
	}

	run(message, args) {

		let year = Number(args[0]);

		if (isNaN(year)) {
			return message.reply(`You need to provide a number!`);
		}

		let currentYear = new Date().getFullYear();

		let age = currentYear - year;

		if (age < 0) return message.reply(`Someone born in **${year}** will be born in **${Math.abs(age)}** years.`);

        message.reply(`Someone born in **${year}** would be **${age}** years old.`);

    }
}