const Event = require('../structures/Event');
const { stripIndents } = require('common-tags');
const numeral = require('numeral');

module.exports = class extends Event {

	async run(message) {

		const mentionRegex = RegExp(`^<@!${this.client.user.id}>$`);
		const mentionRegexPrefix = RegExp(`^<@!${this.client.user.id}> `);

		if (!message.guild || message.author.bot) return;

		if (message.content.match(mentionRegex)) message.channel.send(`My prefix for ${message.guild.name} is \`${this.client.database.getPrefix(message.guild.id) ? this.client.database.getPrefix(message.guild.id) : this.client.prefix}\`.`);

		const prefix = this.client.database.getPrefix(message.guild.id) ? this.client.database.getPrefix(message.guild.id) : this.client.prefix;

		const finalPrefix = message.content.match(mentionRegexPrefix) ? message.content.match(mentionRegexPrefix)[0] : prefix;

		const [cmd, ...args] = message.content.slice(finalPrefix.length).trim().split(/ +/g);

		const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));

		if (command) {

			if (!message.content.startsWith(finalPrefix)) return;

			command.run(message, args);

			this.client.logger.cmd(`${message.author.tag} ran ${command.name} in ${message.guild.name}.`);

			this.client.database.addCommand(command.name);

			let xpAdd = 2;

			this.client.database.addXp(message.author.id, xpAdd);

			this.client.logger.report(message.author.tag, xpAdd, 'xp');
		}

		this.client.database.addMessage(message.author.id);

		let xpAdd = Math.floor(Math.random() * 10) + 1;

		let booster = this.client.database.getBooster(message.author.id) ? this.client.database.getBooster(message.author.id) : false;

		if (Date.now() > booster.end) {
			
			this.client.database.deleteBooster(message.author.id);

			message.author.send(`Your **${booster.type}** expired.`);

		};

		if (booster) {

			if (booster.type === 'DOUBLE XP BOOSTER') {

				this.client.database.addXp(message.author.id, xpAdd * 2);
	
				this.client.logger.report(message.author.tag, xpAdd * 2, 'xp');

			};

			if (booster.type === 'TRIPLE XP BOOSTER') {

				this.client.database.addXp(message.author.id, xpAdd * 3);
	
				this.client.logger.report(message.author.tag, xpAdd * 3, 'xp');

			};
			
			if (booster.type === 'PENTA XP BOOSTER') {

				this.client.database.addXp(message.author.id, xpAdd * 5);
	
				this.client.logger.report(message.author.tag, xpAdd * 5, 'xp');

			};

		} else {

			this.client.database.addXp(message.author.id, xpAdd);
	
			this.client.logger.report(message.author.tag, xpAdd, 'xp');

		};

		let lvl = this.client.database.getLvl(message.author.id);
		let xp = this.client.database.getXp(message.author.id);
		let prestige = this.client.database.getPrestige(message.author.id);
		let nxtLvlXp = this.client.database.getNextLvl(message.author.id);
		let newLvl = lvl + 1
		let newPrestige = prestige + 1;
		
		if (nxtLvlXp <= xp) {

			this.client.database.addLvl(message.author.id, 1);

			this.client.database.addNextLvl(message.author.id);

			this.client.database.payGems(message.author.id, newLvl);

			message.channel.send(stripIndents`
			Congrats ${message.author}, you leveled up!
			You are now level **${newLvl}** *(**+${numeral(newLvl).format('0,0')}** gems)*. 
			`)
	
	
			this.client.logger.report(message.author.tag, '1', 'xp');

			if (99 <= lvl) {

				this.client.database.addPrestige(message.author.id, 1);
	
				this.client.database.clearLvl(message.author.id);
	
				message.channel.send(stripIndents`
				Congrats ${message.author}, you reached new prestige level!
				You are now prestige level **${newPrestige}**.
				`)
	
			};

		};
		
		let baseChance = Math.floor(Math.random() * 10);

		let coinChance = Math.floor(Math.random() * 10);

		let coinAdd = Math.floor(Math.random() * 5);

		if (coinChance = baseChance) {

			if (booster) {

				if (booster.type === 'DOUBLE COIN BOOSTER') {

					this.client.database.payCoins(message.author.id, coinAdd * 2);

					this.client.logger.report(message.author.tag, coinAdd * 2, 'coins');
	
				};

				if (booster.type === 'TRIPLE COIN BOOSTER') {

					this.client.database.payCoins(message.author.id, coinAdd * 3);

					this.client.logger.report(message.author.tag, coinAdd * 3, 'coins');
	
				};
				
				if (booster.type === 'PENTA COIN BOOSTER') {

					this.client.database.payCoins(message.author.id, coinAdd * 5);

					this.client.logger.report(message.author.tag, coinAdd * 5, 'coins');

				};

			} else {

				this.client.database.payCoins(message.author.id, coinAdd);

				this.client.logger.report(message.author.tag, coinAdd, 'coins');

			};

		};

	}

}