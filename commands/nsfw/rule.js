const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');
const  { posts } = require('rule34js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['rule34', 'r34'],
			description: 'If it exists, there is porn of it. If there isn\'t, there will be.',
            category: 'nsfw',
            usage: '<query>'
		});
	}

	async run(message, args) {

        if (!message.channel.nsfw) return message.reply('This isn\'t nsfw channel!');

        if (!args[0]) return message.reply('You need to provide a query!');

        const response = await posts({tags:[args[1] ? args.join('_') : args[0]]});
        if (!response.posts.length) return message.reply('I couldn\'t fetch the image!');

        const safe = response.posts.filter((x) => !x.file_url.endsWith('.mp4'));
        if (!safe.length) return message.reply('I couldn\'t fetch the image!');
    
        const post = safe[Math.floor(Math.random() * safe.length)];

        const embed = new MessageEmbed()
        .setColor(colors.blue)
        .setTitle(this.client.utils.capitaliseFirst(args[1] ? args.join(' ') : args[0]))
        .setDescription(`⬆️ ${post.score}x`)
        .setImage(post.file_url)
        .setURL(`https://rule34.xxx/`)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp()

        message.channel.send(embed);
        
    }
}