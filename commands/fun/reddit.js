const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');
const fetch = require('node-fetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['red', 'sub'],
			description: 'Shows you an image from selected subreddit.',
            category: 'fun',
            usage: '<subreddit>',
            availability: 'Potentially NSFW'
		});
	}

	async run(message, args) {

        let subreddit = args[0];

        let sort;

        if (args[1]) {
            if (args[1].toLowerCase() === 'all' || args[1].toLowerCase() === 'year' || args[1].toLowerCase() === 'week' || args[1].toLowerCase() === 'hot') {
                sort = args[1];
            };
        };

        const sortOptions = [
            'top&t=all',
            'top&t=year',
            'top&t=week',
            'hot'
        ];

        const randomSort = sortOptions[Math.floor(Math.random() * sortOptions.length)];
    
        let msg = await message.channel.send('Fetching image...');
    
        const res = await fetch(
          `https://www.reddit.com/r/${subreddit}.json?sort=${sort ? sort : randomSort}`
        );
        
        const { data } = await res.json();

        const filter = data.children.filter((post) => !post.data.is_video);
        if (!filter.length) return message.reply('I couldn\'t fetch the image!');
    
        const post = filter[Math.floor(Math.random() * filter.length)];

        if (post.data.over_18 && !message.channel.nsfw) return message.reply('This isn\'t nsfw channel!').then(() => {
            msg.delete();
        });
    
        const embed = new MessageEmbed()
        .setColor(colors.blue)
        .setTitle(`${post.data.title}`)
        .setDescription(`⬆️ ${post.data.ups}x | 💬 ${post.data.num_comments}`)
        .setImage(post.data.url)
        .setURL(`https://www.reddit.com${post.data.permalink}`)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp()
        
        message.channel.send(embed);

        msg.delete();

    }
}