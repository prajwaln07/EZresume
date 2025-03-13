const redis = require('redis');

const redisClient = redis.createClient({
  socket: {
    host: '0.0.0.0', 
    port: 6379
  }
});

// Handle Redis connection events
redisClient.on('connect', () => console.log('🚀 Redis Connected Successfully!'));
redisClient.on('error', (err) => console.error('❌ Redis Connection Error:', err));
redisClient.on('reconnecting', () => console.log('🔄 Redis Reconnecting...'));

(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error('❌ Failed to connect to Redis:', err);
  }
})();

module.exports = redisClient;
