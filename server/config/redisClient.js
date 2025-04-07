const redis = require("redis");

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  console.error("❌ REDIS_URL is not set. Make sure to add it in Render's environment variables.");
  process.exit(1); //  if no redis URL ,then stop
}

const redisClient = redis.createClient({
  url: redisUrl, 
  socket: {
    tls: true,
  },
});


(async () => {
  try {
    await redisClient.connect(); 
    console.log("  Redis connection established.");
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
  }
})();

module.exports = redisClient;
