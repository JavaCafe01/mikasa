const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    aliases:['latency'],
    description: 'Ping! Get the latency info.',
    execute(message, args) {
        var data = []
        const emoji = message.client.emojis.cache.get('816360102772342825')

        const apiPing = Math.round(message.client.ws.ping);
        const responseTime = Math.round(Date.now() - message.createdTimestamp);

         data.push(`\`Latency:\` ${responseTime}ms`);
        data.push(`\`API Latency:\` ${apiPing}ms`);

        const embed = new Discord.MessageEmbed()
            .setColor(message.member.displayHexColor)
            .addField("**Pong!**", data)
            .setTimestamp()
            .setFooter(`\u200B`, `https://cdn.discordapp.com/emojis/816360102772342825.gif`);

        message.channel.send(embed);
    },
};
