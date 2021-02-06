const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');
const fetch = require('node-fetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['adv'],
			description: 'Tells you an advice when you need it.',
            category: 'fun',
            usage: '[command]'
		});
	}

	run(message) {

        let query = `https://api.adviceslip.com/advice`;

        fetch(query)
        .then(res => res.json())
        .then(body => {
    
            const embed = new MessageEmbed()
            .setColor(colors.blue)
            .setTitle(`Random Advice`)
            .setDescription(body.slip.advice)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp()

            message.channel.send(embed);
    
        });
        
    }
}