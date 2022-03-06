const redis = require('redis');

const client = async () => {
    redis.createClient({
        port: 6379,
        host: "127.0.0.1",
        // legacyMode:true
    })

    const client = await client.connect()
    return client
}

process.on('SIGINT', () => {
    client.quit()
}) 

module.exports = client;