module.exports = {
    name: 'ping',
    aliases:['latency'],
    description: 'Ping! Get the latency info.',
    execute(message, args) {
        const emoji = message.client.emojis.cache.get('816360102772342825')

        const apiPing = Math.round(message.client.ws.ping);
        const responseTime = Math.round(Date.now() - message.createdTimestamp);

        message.channel.send(`Pong! Latency is ${responseTime}ms, and the API latency is ${apiPing}ms ${emoji}`);
    },
};
