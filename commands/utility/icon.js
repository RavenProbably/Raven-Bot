const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['ic', 'sav'],
			description: 'Displays server\'s icon.',
            category: 'utility',
            usage: '[command]'
		});
	}

	run(message) {

        const embed = new MessageEmbed()
        .setColor(colors.default)
        .setTitle(`${message.guild.name}'s Icon`)
        .setImage(message.guild.iconURL())
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp()
    
        message.channel.send(embed);

    }
}