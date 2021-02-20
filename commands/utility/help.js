const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['commands'],
			description: 'Displays bot\'s command list.',
			category: 'utility',
			usage: '[command | command name]'
		});
	}

	async run(message, [command]) {

		const embed = new MessageEmbed()
		.setAuthor(`Command List`, this.client.user.displayAvatarURL())
		.setColor(colors.default)

		if (command) {

			const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

			if (!cmd) return message.channel.send(`Invalid command!`);

			embed.setTitle(cmd.name);
			embed.setDescription([
				`**❯ Aliases:** ${cmd.aliases.length ? cmd.aliases.map(alias => `\`${alias}\``).join(' ') : 'No aliases provided.'}`,
				`**❯ Description:** ${cmd.description}`,
				`**❯ Category:** ${cmd.category === 'nsfw' ? 'NSFW' : this.client.utils.capitaliseFirst(cmd.category)}`,
				`**❯ Usage:** ${cmd.usage}`,
				`**❯ Availability:** ${cmd.category === 'nsfw' ? 'NSFW' : cmd.availability}`
			]);

			return message.channel.send(embed);

		} else {

			embed.setTitle(`Help`);
			embed.setDescription([
				`**❯ Prefix:** \`${this.client.prefix}\``,
				`**❯ Command Parameters:** \`<>\` is strict & \`[]\` is optional`
			]);
			embed.setThumbnail(this.client.user.displayAvatarURL({ size: 1024 }));
			embed.setFooter(`Total Commands: ${this.client.commands.size}`);

			let categories;

			if (!this.client.owner.includes(message.author.id)) {
				categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== 'restricted').map(cmd => cmd.category));
			} else {
				categories = this.client.utils.removeDuplicates(this.client.commands.map(cmd => cmd.category));
			};

			for (const category of categories) {
				embed.addField(`${category === 'nsfw' ? 'NSFW' : this.client.utils.capitalise(category)}`, this.client.commands.filter(cmd =>
					cmd.category === category).map(cmd => `\`${cmd.name}\``).join(' '));
			};

            return message.channel.send(embed);
            
		};

	}
}