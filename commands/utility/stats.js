const Command = require('../../structures/Command');
const Discord = require('discord.js');
const colors = require('../../colors.json');
const { readdirSync } = require('fs');
const { stripIndents } = require('common-tags');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['botstats', 'bs'],
			description: 'Displays bot\'s stats.',
            category: 'utility',
            usage: '[command]'
		});
	}

	run(message) {

        const categories = readdirSync('./commands/');

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Stats`, this.client.user.displayAvatarURL())
        .setColor(colors.default)
        .addField('General', stripIndents`
        **❯ Uptime:** ${this.client.utils.duration(this.client.uptime)}
        **❯ Memory Usage:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB
        `)
    
        .addField('Versions', stripIndents`
        **❯ Discord.js:** v${Discord.version}
        **❯ Node:** ${process.version}
        `)
    
        .addField('Stats', stripIndents`
        **❯ Server Count:** ${this.client.guilds.cache.size}
        **❯ User Count:** ${this.client.users.cache.size}
        **❯ Channel Count:** ${this.client.channels.cache.size}
        **❯ Category Count:** ${categories.length}
        **❯ Command Count:** ${this.client.commands.size}
        `)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp()
    
        message.channel.send(embed);

    }
}