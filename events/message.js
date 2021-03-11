const { prefix } = require('../config.json');

module.exports = {
    name: 'message',
    execute(message, client) {

        if(message.content.toLowerCase().includes('gokul')) {

            message.react(`👞`);


           
        }
        if(message.content.toLowerCase().includes('mikasa'))
            message.react(`816360448412614707`);

        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command <:aotsad:816360265057828915>');
        }

        console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);
    },
};
