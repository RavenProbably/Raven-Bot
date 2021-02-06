const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { stripIndents } = require('common-tags');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['hexcode'],
            description: 'Displays information about color.',
            category: 'utility',
            usage: '<hex code>'
		});
	}

	run(message, args) {

        if (!args[0]) return message.reply('You need to input a hex code!');
        if (args[0].startsWith('#')) args[0] = args[0].slice(1);
     
        fetch(`http://www.thecolorapi.com/id?hex=${args[0]}`)
        .then(res => res.json())
        .then(body => {
    
            if (!body.hex.value) return message.reply('I couldn\'t find that color!');
    
            const embed = new MessageEmbed()
            .setColor(body.hex.value)
            .setAuthor('Colour Information', `https://www.colourlovers.com/img/${args[0]}/200/200/Sminted.png`) 
            .setTitle(body.hex.value)
            .setDescription(stripIndents`
            **❯ RGB:** ${body.rgb.value}
            **❯ HSL:** ${body.hsl.value}
            **❯ HSV:** ${body.hsv.value}
            **❯ CMYK:** ${body.cmyk.value}
            `)
            .setThumbnail(`https://www.colourlovers.com/img/${args[0]}/200/200/Sminted.png`)
            .setURL(`http://www.thecolorapi.com/id?format=html&hex=${body.hex.clean}`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp()
    
            message.channel.send(embed);

        });

    }
}