const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['serverlist', 'sl'],
			description: 'Displays all servers bot is in.',
            category: 'restricted',
            usage: '[command]'
		});
	}

	run(message) {

        if (message.author.id !== this.client.owner) return message.reply('You don\'t have permission to use this command.');

        let arr = [];

        let content = '';

        this.client.guilds.cache.map(guild => {

            arr.push([guild.name, guild.id, guild.memberCount]);

        });

        for (let i = 0; i < arr.length; i++) {
            let guildName = arr[i][0]
            let guildId = arr[i][1]
            let guildMembers = arr[i][2]

            content += `**${i + 1}.** ${guildName} *(${guildId})* - **${guildMembers}** members\n`;
        };
        
        const embed = new MessageEmbed()
        .setAuthor(`Server List`, this.client.user.displayAvatarURL())
        .setColor(colors.default)
        .setDescription(content)
        .setFooter(`Total Servers: ${this.client.guilds.cache.size}`)
    
        message.channel.send(embed);

    }
}