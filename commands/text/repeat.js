const Command = require('../../structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['rep'],
			description: 'Allows you to convert text to lowercase.',
            category: 'text',
            usage: '<amount> <text>'
		});
	}

	run(message, args) {

		if (!args[0]) return message.reply('You need to provide an amount!');

		if (!args[1]) return message.reply('You need to provide a text!');

		let arr = args;

		for(var i = 0; i < arr.length; i++){
			arr[i] = arr[i] + ' ';
		};

		message.reply(`Here is your converted text: \`${arr.slice(1).join(' ').repeat(Number(args[0]))}\`.`);

    }
}