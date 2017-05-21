const config = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: 'emoteanalyzer',
        password: '' // need auth token
    },
    channels : ["#strippin"]
};

module.exports = config;