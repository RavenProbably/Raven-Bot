const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['av'],
			description: 'Displays user\'s avatar.',
            category: 'utility',
            usage: '[command | user]'
		});
	}

	run(message) {

        if (!message.mentions.users.size) {

            const embed = new MessageEmbed()
            .setColor(colors.default)
            .setTitle('Your Avatar')
            .setImage(message.author.avatarURL())	
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp()

            message.channel.send(embed);
    
        } else {

            let user = message.mentions.users.first();
    
            const embed = new MessageEmbed()
            .setColor(colors.default)
            .setTitle(`${user.username}'s Avatar`)
            .setImage(user.displayAvatarURL())
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp()
        
            message.channel.send(embed);

        };
        
    }
}