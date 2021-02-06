const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['ask', 'question'],
			description: 'Allows you to create poll.',
            category: 'utility',
            usage: '<question>'
		});
	}

	run(message, args) {

        let question;

        question = args.join(' ');

        if (!question) return message.reply('You need to provide a question!');

        !question.endsWith('?') ? question = args.join(' ') + '?' : question;
    
        const embed = new MessageEmbed()
        .setColor(colors.yellow)
        .setAuthor(`${message.author.tag}'s Poll`, message.author.displayAvatarURL())
        .setTitle(`${message.author.username} asks:`)
        .setDescription(question)
        .setFooter('React to vote')
        .setTimestamp()
    
        message.delete();
    
        message.channel.send(embed).then(sentEmbed => {
            sentEmbed.react('✅')
            sentEmbed.react('❌')
        });
        
    }
}