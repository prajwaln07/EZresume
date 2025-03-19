const redis = require("redis");

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  console.error("❌ REDIS_URL is not set. Make sure to add it in Render's environment variables.");
  process.exit(1); // Stop the app if no Redis URL is found
}

const redisClient = redis.createClient({
  url: redisUrl, 
  socket: {
    tls: true, // required for upstash (secure URL) ; 
  },
});

// Redis event listeners
redisClient.on("connect", () => console.log("🚀 Redis Connected Successfully!"));
redisClient.on("error", (err) => console.error("❌ Redis Connection Error:", err));
redisClient.on("reconnecting", () => console.log("🔄 Redis Reconnecting..."));

// Connect to Redis
(async () => {
  try {
    await redisClient.connect(); // Required for Redis v4+
    console.log("✅ Redis connection established.");
  } catch (err) {
    console.error("❌ Failed to connect to Redis:", err);
  }
})();

module.exports = redisClient;
