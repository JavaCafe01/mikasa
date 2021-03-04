const { prefix } = require('../../config.json');

module.exports = {
    name: 'say',
    aliases: ['msg', 'talk'],
    description: 'Talk as the bot',
    execute(message, args) {
        var ch = message.channel;
        message.delete();
        ch.send(message.content.substring(prefix.length + 3)); 
    },
};
