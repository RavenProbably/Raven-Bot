const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');
const fetch = require('node-fetch');
const { stripIndents } = require('common-tags');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['lyr', 'text'],
			description: 'Displays link to page with lyrics of a song.',
            category: 'utility',
            usage: '<song>'
		});
	}

	run(message, args) {

        if (!args.join(' ')) return message.reply('You need to input a song!');

        fetch(`https://some-random-api.ml/lyrics?title=${args.join('-')}`)
        .then(res => res.json())
        .then(body => {
    
            if (body.error) return message.reply('I couldn\'t find that song\'s lyrics!');
    
            const embed = new MessageEmbed()
            .setColor(colors.green)
            .setTitle(`Success!`)
            .setDescription(stripIndents`
            Found lyrics for **${body.author} - ${body.title}**
            *[Click here to view lyrics](${body.links.genius})*
            `)
            .setThumbnail(body.thumbnail.genius)
            .setURL(body.links.genius)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp()
    
            message.channel.send(embed);

        });

    }
}