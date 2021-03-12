module.exports = {
    name: 'say',
    aliases: ['msg', 'talk'],
    description: 'Talk as the bot',
    execute(message, args) {
         if(!args[0]) return message.channel.send({embed: {color: 'RED', description: ':no_entry_sign: | Please tell me what you want me to say!'}});
        
         const sayMessage = args.join(" ");
    

    message.delete().catch(O_o=>{}); 

    message.channel.send(sayMessage);
    },
};
