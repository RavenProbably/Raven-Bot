const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');
const { stripIndents } = require('common-tags');
const ms = require('ms');
const moment = require('moment');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['rm', 'remindme'],
			description: 'Allows you to create a reminder.',
            category: 'utility',
            usage: '<time> <text>'
		});
	}

	run(message, args) {

        const client = this.client;

        if (!args[0]) return message.reply(stripIndents`You need to input a time:
        \`10s\`
        \`10m\`
        `);
        if (!args[1]) return message.reply('You need to input a reason!');
        
        let time = ms(args[0]);

        let reminder = args[1];

        this.client.database.setReminder(message.author.id, Date.now(), Date.now() + time);

        message.reply(`Reminder set for **${moment(Date.now() + ms(args[0])).format('MMMM Do YYYY, h:mm:ss a')}**.`);

        const interval = setInterval(() => {

            if (Date.now() > client.database.getReminder(message.author.id)) {

                const embed = new MessageEmbed()
                .setColor(colors.green)
                .setTitle('Reminding you')
                .setDescription(reminder)

                message.author.send(embed);

                client.database.deleteReminder(message.author.id);
                
                clearInterval(interval);

            };

        }, 1000);

    }
}