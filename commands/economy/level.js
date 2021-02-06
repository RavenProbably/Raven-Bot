const Command = require('../../structures/Command');
const numeral = require('numeral');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['lvl', 'xp', 'prestige'],
            description: 'Displays user\'s level & xp information.',
            category: 'economy',
            usage: '[command | user]'
        });
    }

    run(message) {

        if (!message.mentions.users.size) {

            let xp = numeral(this.client.database.getXp(message.author.id)).format('0,0');
            let lvl = numeral(this.client.database.getLvl(message.author.id)).format('0,0');
            let prestige = numeral(this.client.database.getPrestige(message.author.id)).format('0,0');
            let nxtLvlXp = this.client.database.getNextLvl(message.author.id);
            let difference = nxtLvlXp - this.client.database.getXp(message.author.id);

            return message.reply(`You are level **${lvl}**, prestige level **${prestige}** *(${xp} xp*) and you need **${difference} xp** til next level.`);

        } else {

            let user = message.mentions.users.first();

            let xp = numeral(this.client.database.getXp(user.id)).format('0,0');
            let lvl = numeral(this.client.database.getLvl(user.id)).format('0,0');
            let prestige = numeral(this.client.database.getPrestige(user.id)).format('0,0');
            let nxtLvlXp = this.client.database.getNextLvl(user.id);
            let difference = nxtLvlXp - this.client.database.getXp(user.id);

            return message.channel.send(`${user} is level **${lvl}**, prestige level **${prestige}** *(${xp} xp*) and needs **${difference} xp** til next level.`);
            
        };

    }
}