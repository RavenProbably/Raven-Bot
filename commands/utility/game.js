const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');
const { stripIndents } = require('common-tags');
const hltb = require('howlongtobeat');
const hltbService = new hltb.HowLongToBeatService();
const steam = require('steam-provider');
const provider = new steam.SteamProvider();

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['gi', 'htlb', 'steam'],
			description: 'Displays information about game.',
            category: 'utility',
            usage: '<game>'
		});
	}

	run(message, args) {

        if (!args[0]) return message.reply('You need to provide a game!');

        let name = args[1] ? args.join(' ') : args[0];

        hltbService.search(name).then(result => {

            if (!result[0]) return message.reply('I couldn\'t find any result!');

            provider.search(name, 1, 'en', 'cz').then(game => {

                try {

                    const embed = new MessageEmbed()
                    .setColor(colors.green)
                    .setAuthor(`Game Information`)
                    .setTitle(result[0].name)
                    .addField('Basic', stripIndents`
                    **❯ Price:** ${game[0].price}€
                    **❯ Score:** ${game[0].score}
                    `)
                    .addField('Length', stripIndents`
                    **❯ Main Story:** ${result[0].gameplayMain} hours
                    **❯ Main + Extra:** ${result[0].gameplayMainExtra} hours
                    **❯ Completionist:** ${result[0].gameplayCompletionist} hours
        
                    `)
                    .setThumbnail(result[0].imageUrl)
                    .setURL(`https://store.steampowered.com/app/${game[0].id}`)
                    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                    .setTimestamp()
        
                    message.channel.send(embed);

                } catch (err) {

                    console.log(err);

                };
                
            });

        });

    }
}