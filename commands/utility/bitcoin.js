const Command = require('../../structures/Command');
const fetch = require('node-fetch');
const moment = require('moment');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['btc'],
			description: 'Tells you a current value of bitcoin.',
            category: 'utility',
            usage: '[command]'
		});
	}

	run(message) {

        let query = `https://api.coindesk.com/v1/bpi/currentprice/eur.json`;

        fetch(query)
        .then(res => res.json())
        .then(body => {

            return message.reply(`Bitcoin is currently worth **${body.bpi.EUR.rate}** ${body.bpi.EUR.code} *(${moment(body.time.updated).format('MMMM Do YYYY, h:mm:ss a')})*.`);

        });
        
    }
}