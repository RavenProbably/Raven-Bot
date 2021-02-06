const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');
const moment = require('moment');
const { stripIndents } = require('common-tags');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['s', 'si'],
			description: 'Displays information about server.',
            category: 'utility',
            usage: '[command]'
		});
	}

	run(message) {

        let filterLevels = {
            DISABLED: 'Off',
            MEMBERS_WITHOUT_ROLES: 'No Role',
            ALL_MEMBERS: 'Everyone'
        };
        
        let verificationLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: '(╯°□°）╯︵ ┻━┻',
            VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
        };
    
        let regions = {
            brazil: 'Brazil',
            europe: 'Europe',
            hongkong: 'Hong Kong',
            india: 'India',
            japan: 'Japan',
            russia: 'Russia',
            singapore: 'Singapore',
            southafrica: 'South Africa',
            sydney: 'Sydney',
            'us-central': 'US Central',
            'us-east': 'US East',
            'us-west': 'US West',
            'us-south': 'US South'
        };
    
        const embed = new MessageEmbed()
        .setAuthor(`Server Information`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setColor(colors.default)
        .addField('General', stripIndents`
        **❯ Name:** ${message.guild.name}
        **❯ ID:** ${message.guild.id}
        **❯ Owner:** ${message.guild.owner}
        **❯ Region:** ${regions[message.guild.region]}
        **❯ Created:** ${moment.utc(message.guild.createdAt).format('dddd, MMMM Do, YYYY')} (${this.client.utils.checkDays(message.channel.guild.createdAt)})
        **❯ Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}
        **❯ Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}
        **❯ Verification Level:** ${verificationLevels[message.guild.verificationLevel]}
        **❯ Prefix:** ${this.client.database.getPrefix(message.guild.id) ? this.client.database.getPrefix(message.guild.id) : this.client.prefix}
        `)
    
        .addField('Stats', stripIndents`
        **❯ Member Count:** ${message.guild.memberCount}
        **❯ Bot Count:** ${message.guild.members.cache.filter(member => member.user.bot).size}
        **❯ Role Count:** ${message.guild.roles.cache.size}
        **❯ Channel Count:** ${message.guild.channels.cache.size}
        **❯ Text Channel Count:** ${message.guild.channels.cache.filter(channel => channel.type === 'text').size}
        **❯ Voice Channel Count:** ${message.guild.channels.cache.filter(channel => channel.type === 'voice').size}
        **❯ Emoji Count:** ${message.guild.emojis.cache.size}
        **❯ Image Emoji Count:** ${message.guild.emojis.cache.filter(emoji => !emoji.animated).size}
        **❯ Animated Emoji Count:** ${message.guild.emojis.cache.filter(emoji => emoji.animated).size}
        **❯ Boost Count:** ${message.guild.premiumSubscriptionCount || '0'}
        `, true)
    
        .addField('Presence', stripIndents`
        **❯ Online:** ${message.guild.members.cache.filter(member => member.presence.status === 'online').size}
        **❯ Idle:** ${message.guild.members.cache.filter(member => member.presence.status === 'idle').size}
        **❯ Do Not Disturb:** ${message.guild.members.cache.filter(member => member.presence.status === 'dnd').size}
        **❯ Offline:** ${message.guild.members.cache.filter(member => member.presence.status === 'offline').size}
        `, true)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp()
    
        message.channel.send(embed);

    }
}