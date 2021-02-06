const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');
const { stripIndents } = require('common-tags');
const numeral = require('numeral');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['lb', 'top'],
            description: 'Displays leaderboard.',
            category: 'utility',
            usage: '<option>'
        });
    }

    run(message, args) {

        if (!args[0]) return message.reply(stripIndents`You need to provide a valid option:
        \`xp\`, \`lvl\` or \`level\` for xp & level
        \`c\` or \`coins\` for coins
        \`msg\` or \`messages\` for messages
        \`cmd\` or \`commands\` for commands
        \`g\` or \`gems\` for gems
        `);

        if (args[0].toLowerCase() === 'xp' || args[0].toLowerCase() === 'lvl' || args[0].toLowerCase() === 'level') {

            const rows = this.client.database.getTopXp();

            let content = '';

            for (let i = 0; i < rows.length; i++) {
                let username = rows[i].username;
                let xp = numeral(rows[i].xp).format('0,0');
                let lvl = numeral(rows[i].level).format('0,0');

                content += `**${i + 1}.** ${username} - **${xp}** *(${lvl})*\n`;
            };

            const embed = new MessageEmbed()
            .setColor(colors.default)
            .setAuthor(`Leaderboard`, this.client.user.displayAvatarURL())
            .setTitle('✨ XP')
            .setDescription(content)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp()

            message.channel.send(embed);

        };

        if (args[0].toLowerCase() === 'c' || args[0].toLowerCase() === 'coins') {

            const rows = this.client.database.getTopCoins();

            let content = '';

            for (let i = 0; i < rows.length; i++) {
                let username = rows[i].username;
                let coins = numeral(rows[i].coins).format('0,0');

                content += `**${i + 1}.** ${username} - **${numeral(coins).format('0,0')}**\n`;
            };

            const embed = new MessageEmbed()
            .setColor(colors.default)
            .setAuthor(`Leaderboard`, this.client.user.displayAvatarURL())
            .setTitle('💰 Coins')
            .setDescription(content)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp()

            message.channel.send(embed);

        };

        if (args[0].toLowerCase() === 'msg' || args[0].toLowerCase() === 'messages') {

            const rows = this.client.database.getTopMessages();

            let content = '';

            for (let i = 0; i < rows.length; i++) {
                let username = rows[i].username;
                let messages = numeral(rows[i].global).format('0,0');

                content += `**${i + 1}.** ${username} - **${messages}**\n`;
            };

            const embed = new MessageEmbed()
            .setColor(colors.default)
            .setAuthor(`Leaderboard`, this.client.user.displayAvatarURL())
            .setTitle('💬 Messages')
            .setDescription(content)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp()

            message.channel.send(embed);

        };

        if (args[0].toLowerCase() === 'cmd' || args[0].toLowerCase() === 'commands') {

            const rows = this.client.database.getTopCommands();

            let content = '';

            for (let i = 0; i < rows.length; i++) {
                let name = rows[i].name;
                let ran = numeral(rows[i].ran).format('0,0');

                content += `**${i + 1}.** ${name} - **${ran}**\n`;
            };

            const embed = new MessageEmbed()
            .setColor(colors.default)
            .setAuthor(`Leaderboard`, this.client.user.displayAvatarURL())
            .setTitle('⚡ Commands')
            .setDescription(content)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp()

            message.channel.send(embed);

        };

        if (args[0].toLowerCase() === 'g' || args[0].toLowerCase() === 'gems') {

            const rows = this.client.database.getTopGems();

            let content = '';

            for (let i = 0; i < rows.length; i++) {
                let username = rows[i].username;
                let gems = numeral(rows[i].gems).format('0,0');

                content += `**${i + 1}.** ${username} - **${numeral(gems).format('0,0')}**\n`;
            };

            const embed = new MessageEmbed()
            .setColor(colors.default)
            .setAuthor(`Leaderboard`, this.client.user.displayAvatarURL())
            .setTitle('💎 Gems')
            .setDescription(content)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp()

            message.channel.send(embed);

        };

    }
}