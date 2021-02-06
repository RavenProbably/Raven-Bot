const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');
const fetch = require('node-fetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['shower', 'st'],
			description: 'Tells you a shower thought.',
            category: 'fun',
            usage: '[command]'
		});
	}

	async run(message) {

        const subreddits = [
            'Showerthoughts'
        ];

        const sortOptions = [
            'top&t=all',
            'top&t=year',
            'top&t=week',
            'hot'
        ];
    
        const randomSub = subreddits[Math.floor(Math.random() * subreddits.length)];

        const randomSort = sortOptions[Math.floor(Math.random() * sortOptions.length)];
    
        let msg = await message.channel.send('Fetching content...');
    
        const res = await fetch(
          `https://www.reddit.com/r/${randomSub}.json?sort=${randomSort}`
        );
        
        const { data } = await res.json();
    
        const safe = data.children.filter(post => !post.data.over_18 && !post.is_video);;
        if (!safe.length) return message.channel.send('I couldn\'t fetch the content!');
    
        const post = safe[Math.floor(Math.random() * safe.length)];
    
        const embed = new MessageEmbed()
        .setColor(colors.blue)
        .setTitle(`${post.data.title}`)
        .setDescription(`⬆️ ${post.data.ups}x | 💬 ${post.data.num_comments}`)
        .setURL(`https://www.reddit.com${post.data.permalink}`)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp()
        
        message.channel.send(embed).then(sentEmbed => {
            sentEmbed.react('⬆️')
            sentEmbed.react('⬇️')
        })
        msg.delete();

    }
}