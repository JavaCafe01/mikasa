const init_time = Date.now()

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        const startup_time = Date.now() - init_time;
        console.log(`Logged in as ${client.user.tag}, and started up in ${startup_time}ms!\n`);
    },
};

