const Command = require('../../structures/Command');
const numeral = require('numeral');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['used'],
            description: 'Displays how many times was command ran.',
            category: 'utility',
            usage: '[command]'
        });
    }

    run(message, args) {

        if (!args[0]) return message.reply('You need to input a command!');

        let command = args[0];

        const ran = numeral(this.client.database.getCommandRan(command)).format('0,0');

        message.channel.send(`Command **${command}** has been run **${ran} times**.`);

    }
}