const Discord = require('discord.js');
const { prefix } = require('../../config.json');

module.exports = {
    name: 'help',
    description: 'List all of commands or the info about a specific command.',
    aliases: ['commands'],
    usage: '[command name]',
    cooldown: 5,
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        var emojilist = message.guild.emojis.cache.map(e => e.id);
        var index = Math.floor(Math.random() * emojilist.length);

        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get more info on a specific command`);

            const embed = new Discord.MessageEmbed()
                .setColor(message.member.displayHexColor)
                .addField("**Help** ❓", data)
                .setTimestamp()
                .setFooter(`\u200B`, `https://cdn.discordapp.com/emojis/${emojilist[index]}.png`);

            return message.channel.send(embed);
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('that\'s not a valid command <:why_mikasa:811769582331232257>');
        }

        data.push(`\`Name:\` ${command.name}`);

        if (command.aliases) data.push(`\`Aliases:\` ${command.aliases.join(', ')}`);
        if (command.description) data.push(`\`Description:\` ${command.description}`);
        if (command.usage) data.push(`\`Usage:\` ${prefix}${command.name} ${command.usage}`);

        data.push(`\`Cooldown:\` ${command.cooldown || 3} second(s)`);
        const embed = new Discord.MessageEmbed()
            .setColor(message.member.displayHexColor)
            .addField("**Command** ❓", data)
            .setTimestamp()
            .setFooter(`\u200B`, `https://cdn.discordapp.com/emojis/${emojilist[index]}.png`);

        message.channel.send(embed);
    },
};
