const Discord = require('discord.js');


function getEmbed(author, member) {

    const embed = new Discord.MessageEmbed()
        .setAuthor(`${author.tag}`)
        .setImage(author.displayAvatarURL({ format: "png", dynamic: true , size: 4096}))
        .setColor(member.displayHexColor)
        .setTimestamp()
    return embed
}

module.exports = {
    name: 'pfp',
    description: 'Get a user\'s profile picture',
    aliases: ['pic', 'profile'],
    usage: '[user nickname]',
    cooldown: 5,
    execute(message, args) {
        var found = false;
        if (!args.length) {
            return message.channel.send(getEmbed(message.author, message.member));
        }
        else if(message.mentions.users.size) {
            const taggedUser = message.mentions;
            return message.channel.send(getEmbed(taggedUser.users.first(), taggedUser.members.first()));
        }
        else {
            const nick = args[0];
            if(!(typeof nick === 'string') && !(nick instanceof String)) {
                return message.reply("The argument must be a string"); 
            }

            message.guild.members.fetch().then(r => {
                r.each(m => {
                    if(nick.toLowerCase() === m.user.username.toLowerCase()) {
                        found = true;
                        return message.channel.send(getEmbed(m.user, m));
                    }
                });

                if(!found){
                    return message.reply(`${args[0]} is not a real user of this server <:why_mikasa:811769582331232257>`);
                }
            }).catch(console.error);
        }
    },
};
