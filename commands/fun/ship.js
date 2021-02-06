const Command = require('../../structures/Command');
const moment = require('moment');
const { stripIndents } = require('common-tags');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['bond'],
			description: 'Creates a bond between you and the selected user.',
            category: 'fun',
            usage: '<user | argument>'
		});
	}

	run(message, args) {

        const initiator = this.client.database.getBond(message.author.id);

        if (!args[0]) return message.reply(stripIndents`You need to provide an user or an argument:
        - Type \`info\` to show your current relationship information.
        - Type \`break up\` to break up.
        `);

        if (args[0].toLowerCase() === 'info') {

            if (initiator) {

                this.client.database.getBond(message.author.id)
                return message.reply(`You are currently in relationship with **${initiator.secondusername === message.author.username ? initiator.username : initiator.secondusername}** since **${initiator.date}**!`);
                
            } else {

                return message.reply('You are not in any relationship!');

            };

        };

        if (args[0].toLowerCase() === 'break' && args[1].toLowerCase() === 'up') {

            if (!initiator) {

                return message.reply('You are not in any relationship!');

            } else {

                this.client.database.deleteBond(message.author.id);
                return message.channel.send(`**${message.author.username}** broke up with **${initiator.secondusername}**!`);

            };

        }

        if (initiator) {

            message.reply(`You already are in relationship with **${initiator.secondusername === message.author.username ? initiator.username : initiator.secondusername}** since **${initiator.date}**!`);

        }

        if (!message.mentions.users.size) return message.reply('You can\'t create a bond with yourself!');

        let user = message.mentions.users.first();

        const receiver = this.client.database.getBond(user.id);

        if (receiver) return message.reply(`**${user.username}** already is in relationship!`);

        if (!initiator && !receiver) {

            const date = moment().format('MMMM Do YYYY, h:mm:ss a');

            const filter = (m) => m.author.id === user.id;
    
            message.channel.send(`**${message.author.username}** wants to ship with **${user.username}**! ${user}, Respond with '**yes**' or '**no**'.`);

            message.channel
            .awaitMessages(filter, { max: 1, time: 10000, errors: ['time']})
            .then((collected) => {

                const msg = collected.first();

                if (msg.content.toLowerCase() === 'yes') {

                    message.channel.send(`**${user.username}** accepted **${message.author.username}**'s relationship offer!`);
                    message.channel.send(`**${user.username}** & **${message.author.username}** are now a happy couple! ❤️`);
                    this.client.database.setBond(message.author.id, user.username, user.id, date);

                }

                if (msg.content.toLowerCase() === 'no') return message.channel.send(`**${user.username}** declined **${message.author.username}**'s relationship offer!`);

            }).catch((err) => console.log(err));
        };
        
    }
}