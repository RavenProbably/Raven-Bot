const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require('../../colors.json');
const { stripIndents } = require('common-tags');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['cfg', 'conf'],
            description: 'Allows you to view your server\'s configuration.',
            category: 'config',
            usage: '[command]'
        });
    }

    run(message) {

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You don\'t have permission to use this command.');
        if (!message.guild.me.hasPermission('ADMINISTRATOR')) return message.reply('I don\'t have permission to execute this command!');

        let logs = this.client.database.getLogs(message.guild.id);
        let prefix = this.client.database.getPrefix(message.guild.id);
        let autorole = this.client.database.getAutorole(message.guild.id);

        const embed = new MessageEmbed()
        .setColor(colors.default)
        .setAuthor(`${message.guild.name}'s Configuration`, message.guild.iconURL())
        .addField('General', stripIndents`
        **❯ Logs Channel:** ${logs ? this.client.channels.cache.find(channel => channel.name === logs.channelname) : 'None'}
        **❯ Custom Prefix:** ${prefix ? prefix : 'None'}
        **❯ Autorole:** ${autorole ? autorole.rolename : 'None'}
        `)

        message.channel.send(embed);

    }
}