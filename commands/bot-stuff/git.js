module.exports = {
	name: 'git',
    aliases: ['repo', 'github'],
	description: 'Get the repository of this bot',
	execute(message, args) {
		message.channel.send(`https://github.com/JavaCafe01/mikasa.git`);
	},
};
