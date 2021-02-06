const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');
const gifs = require('../../gifs.json');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'Sends a "laugh" action gif.',
            category: 'actions',
            usage: '<user>'
		});
	}

	run(message) {

        const actions = gifs.laugh;

        if (!message.mentions.users.size) return message.reply('You need to provide an user!');

        let user = message.mentions.users.first();

        const random = Math.floor(Math.random() * actions.length);

        const embed = new MessageEmbed()
        .setColor(colors.blue)
        .setTitle(`**${message.author.username}** laughed at **${user.username}**!`)
        .setImage(actions[random])
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp()

        message.channel.send(embed);

    }
}