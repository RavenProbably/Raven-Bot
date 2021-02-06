const Command = require('../../structures/Command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['eval', 'js', 'script'],
            description: 'Evaluates JavaScript code.',
            category: 'restricted',
            usage: '<js code>'
        });
    }

    run(message, args) {

        if (message.author.id !== this.client.owner) return message.reply('You don\'t have permission to use this command.');

        let toEval = args.slice(0).join(' ');
        let evaluated = eval(toEval);

        try {

            if (toEval) {

                let start = process.hrtime();
                let diff;
                diff = process.hrtime(start);
                return message.channel.send(`Executed in **${diff[0] > 0 ? `${diff[0]}s` : ''}${diff[1] / 1000000}ms**. \`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 });

            } else {

                message.reply('You need to provide something to evaluate!');

            };
            
        } catch (e) {

            message.reply(`Error whilst evaluating: \`${e.message}\``);

        };

    }
}