const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');
const fetch = require('node-fetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'Self-explainable.',
            category: 'nsfw',
            usage: '[command]'
		});
	}

	async run(message) {

        if (!message.channel.nsfw) return message.reply('This isn\'t nsfw channel!');

        const subreddits = [
            'AnalGW'
        ];

        const sortOptions = [
            'top&t=all',
            'top&t=year',
            'top&t=week',
            'hot'
        ];
    
        const randomSub = subreddits[Math.floor(Math.random() * subreddits.length)];

        const randomSort = sortOptions[Math.floor(Math.random() * sortOptions.length)];
    
        let msg = await message.channel.send('Fetching image...');
    
        const res = await fetch(
          `https://www.reddit.com/r/${randomSub}.json?sort=${randomSort}`
        );
        
        const { data } = await res.json();
    
        const safe = message.channel.nsfw ? data.children : data.children.filter((post) => !post.data.is_video);
        if (!safe.length) return message.reply('I couldn\'t fetch the image!');
    
        const post = safe[Math.floor(Math.random() * safe.length)];
    
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