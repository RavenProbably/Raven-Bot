const Command = require('../../structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['13'],
			description: 'Tells you if today is Friday the 13th.',
            category: 'utility',
            usage: '[command]'
		});
	}

	run(message) {

        const today = new Date();

        const isIt = today.getDay() === 5 && today.getDate() === 13;
        
		return message.reply(`Today **is${isIt ? '' : ' not'}** Friday the 13th.`);

    }
}