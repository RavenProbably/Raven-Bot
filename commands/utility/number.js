const Command = require('../../structures/Command');
const numeral = require('numeral');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['num'],
			description: 'Chooses random number from selection.',
            category: 'utility',
            usage: '<max number>'
		});
	}

	run(message, args) {

        if (!args[0]) return message.reply('You need to input a maximum number!');

        let rangeNumber = args[0];

        let randomNumber = Math.floor(Math.random() * rangeNumber) + 1;
   
        message.reply(`I choose **${numeral(randomNumber).format('0,0')}**.`);

    }
}