const Discord = require('discord.js');
const message = require('../../events/message');


function getEmbed(author, member, emoji_id) {

    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


    const createdDate = author.createdAt;
    const joinedDate = member.joinedAt;

    const embed = new Discord.MessageEmbed()
        .setAuthor(`${author.tag}`)
        .setThumbnail(author.displayAvatarURL({ format: "webp", dynamic: true }))
        .setColor(member.displayHexColor)
        .addField("**ID/Snowflake**", author.id)
        .addField("**Created Date**", `${months[createdDate.getMonth()]} ${createdDate.getDate()}, ${createdDate.getFullYear()}`)
        .addField("**Joined Date**", `${months[joinedDate.getMonth()]} ${joinedDate.getDate()}, ${joinedDate.getFullYear()}`)
        .addField("**Roles**", member.roles.cache.map(r => `${r}`).join(', '), true)
        .setFooter(`\u200B`, `https://cdn.discordapp.com/emojis/${emoji_id}.png`)
        .setTimestamp();

    return embed
}

module.exports = {
    name: 'info',
    description: 'Get a user\'s info',
    aliases: ['id'],
    usage: '[user nickname]',
    cooldown: 5,
    execute(message, args) {
        var found = false;

        var emojilist = message.guild.emojis.cache.map(e => e.id);
        var index = Math.floor(Math.random() * emojilist.length);

        if (!args.length) {
            return message.channel.send(getEmbed(message.author, message.member, emojilist[index]));
        }
        else if(message.mentions.users.size) {
            const taggedUser = message.mentions;
            return message.channel.send(getEmbed(taggedUser.users.first(), taggedUser.members.first(), emojilist[index]));
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
                        return message.channel.send(getEmbed(m.user, m, emojilist[index]));
                    }
                });

                if(!found){
                    return message.reply(`${args[0]} is not a real user of this server <:why_mikasa:811769582331232257>`);
                }
            }).catch(console.error);
        }
    },
};
