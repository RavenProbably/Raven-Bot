const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');
const moment = require('moment');
const { stripIndents } = require('common-tags');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['i', 'about', 'owner'],
			description: 'Displays information about bot.',
            category: 'utility',
            usage: '[command]'
		});
	}

	run(message) {

        const embed = new MessageEmbed()
        .setAuthor(`Information`, this.client.user.displayAvatarURL())
        .setColor(colors.default)
        .setDescription(`Unique private Discord bot made for my Discord server.`)
        .addField('General', stripIndents`
        **❯ Owner:** ${this.client.users.cache.find(user => user.id === this.client.owner).tag}
        **❯ Ideas:** ${this.client.users.cache.find(user => user.id === '270298087065518090').tag}
        **❯ Created:** ${moment.utc(message.guild.members.cache.get(this.client.user.id).user.createdAt).format('dddd, MMMM Do, YYYY')} (${this.client.utils.checkDays(message.guild.members.cache.get(this.client.user.id).user.createdAt)})
        `)
        .addField('Links', stripIndents`
        **❯ Server:** [Here](https://discord.gg/KD457qA)
        **❯ Source Code:** [Here](https://github.com/RavenProbably/Raven-Bot)
        `)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp()
    
        message.channel.send(embed);

    }
}