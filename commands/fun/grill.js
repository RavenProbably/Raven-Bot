const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');
const pics = require('../../pics.json');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'Shows you a pretty grill image.',
            category: 'fun',
            usage: '[command]'
		});
	}

	run(message) {

        const images = pics.grill;

        const random = Math.floor(Math.random() * images.length);

        const embed = new MessageEmbed()
        .setColor(colors.orange)
        .setTitle(`Damn, that's a nice grill!`)
        .setImage(images[random])
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp()

        message.channel.send(embed);

    }
}