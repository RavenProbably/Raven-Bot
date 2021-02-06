const Command = require('../../structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['msg'],
			description: 'Makes bot say something.',
            category: 'restricted',
            usage: '<message>'
		});
	}

	run(message, args) {

		if (message.author.id !== this.client.owner) return message.reply('You don\'t have permission to use this command.');

        message.delete();

        message.channel.send(args.join(' '));

    }
}