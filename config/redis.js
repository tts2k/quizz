const httpStatus = require('http-status');
const { createClient } = require('redis');
const logger = require('./logger');
const config = require('./config');


let client;

(async () => {
  client = createClient();
  client.on('connect', () => {
    logger.info('Redis client connected');
  });

  client.on('reconnect', () => {
    logger.info('Redis client reconnected');
  });

  client.on('ready', () => {
    logger.info('Redis client is ready'); 
  });

  client.on('end', () => {
    logger.info('Redis client disconnected');
  })

  client.on('error', (err) => {
    logger.error('Redis client error');
    throw err;
  });

  await client.connect();
})();

module.exports = {
  get: async (userId, token) => {
    return await client.get(config.redis.key + `:${userId}:` + token);
  },
  set: async (userId, token, expirationDays) => {
    const SECONDS_IN_A_DAY = 86400;
    await client.set(config.redis.key + `:${userId}:`+ token, 1, {
      EX: expirationDays * SECONDS_IN_A_DAY
    });
  },
  quit: async () => {
    await client.quit();
  },
  del: async (userId, token) => {
    return await client.del(config.redis.key + `:${userId}:` + token);
  }
};


