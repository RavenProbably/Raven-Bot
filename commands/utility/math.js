const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');
const { evaluate }= require('mathjs');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['calculate', 'calc'],
			description: 'Allows you to perform mathematical operations and convert units.',
            category: 'utility',
            usage: '<math operation>'
		});
	}

	run(message, args) {
        
        if (!args.join(' ')) return message.reply('You need to input a mathematical operation!');
    
        let resp;
        try {

            resp = evaluate(args.join(' '));

        } catch (e) {

            return message.reply('You need to input a valid mathematical operation!');

        };
    
        const embed = new MessageEmbed()
        .setColor(colors.blue)
        .setAuthor(`${message.author.username}'s Calculation`, message.author.displayAvatarURL())
        .addField('Input', `\`\`\`js\n${args.join(' ')}\`\`\``)
        .addField('Output', `\`\`\`js\n${resp}\`\`\``)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp()
    
        message.channel.send(embed);

    }
}