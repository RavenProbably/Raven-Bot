const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');
const pics = require('../../pics.json');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['cookies'],
			description: 'Shows you a cookie image.',
            category: 'fun',
            usage: '[command]'
		});
	}

	run(message) {

        const images = pics.cookie;

        const random = Math.floor(Math.random() * images.length);

        const embed = new MessageEmbed()
        .setColor(colors.orange)
        .setTitle(`Everyone deserves a cookie!`)
        .setImage(images[random])
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp()

        message.channel.send(embed);

    }
}