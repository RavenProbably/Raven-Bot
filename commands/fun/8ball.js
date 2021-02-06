const Command = require('../../structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['8b', 'eb'],
			description: '8ball... I guess?',
            category: 'fun',
            usage: '[question]'
		});
	}

	run(message, args) {

        if (!args.join(' ')) return message.reply('You need to provide a question!');
    
        let replies = [
            'It is certain.', 'Without a doubt.', 'Yes - definitely.', 'As I see it, yes.', 'Most likely.', 'Yes.', 'Signs point to yes.', 'Ask again later.', 'Hell no.', 'No.', 'My reply is no.',
            'My sources say no.', 'Concentrate and ask again.', 'don\'t count on it.', 'Maybe.', 'That is sure as hell.', 'Indeed.', 'Answer is uncertain.', 'Maybe no.', 'Maybe yes.', 'Better ask yourself.',
            'Sorry, but this is really stupid question.', 'Very bad idea.', 'Never.', 'What do you think?' , 'Yep.', 'NO with caps lock.', 'YES with caps lock.', 'Stupid question, try again.'
        ];
    
        const random = Math.floor(Math.random() * replies.length);
    
        message.reply(replies[random]);

    }
}