module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
		message.channel.send(`Pong <a:aotattack3gif:816360448412614707>`);
	},
};
