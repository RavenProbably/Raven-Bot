const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');
const fetch = require('node-fetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['se', 'wiki'],
			description: 'Allows you to search for something.',
            category: 'utility',
            usage: '<query>'
		});
	}

	run(message, args) {

        let query = `https://api.duckduckgo.com/?q=${args.join('+')}&format=json`;

        fetch(query)
        .then(res => res.json())
        .then(body => {

            const embed = new MessageEmbed()
            .setAuthor(`Search`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp()

            if (!body.Heading) {

                return message.reply('I couldn\'t find any result!');

            } else {

                embed.setColor(colors.green);
                embed.setTitle(body.Heading);
                embed.setDescription(body.AbstractText ? body.AbstractText : body.RelatedTopics[0].Text);
                embed.setThumbnail(`https://duckduckgo.com${body.Image ? body.Image : body.RelatedTopics[0].Icon.URL}`);
                embed.setURL(body.AbstractURL ? body.AbstractURL : body.RelatedTopics[0].URL);
                
            };

            message.channel.send(embed);

        });

    }
}