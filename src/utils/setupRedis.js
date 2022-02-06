const { createClient } = require("redis");

const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_HOST = process.env.REDIS_HOST;

let client = null;

if (REDIS_PORT) {
  client = createClient({
    socket: {
      port: REDIS_PORT,
      host: REDIS_HOST,
      noDelay: true,
    },
  });

  (async function () {
    await client.connect();
    console.log("Redis client configured");
  })();
}

module.exports = client;
