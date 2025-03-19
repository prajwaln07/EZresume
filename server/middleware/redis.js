const redisClient = require('../config/redisClient');

const CACHE_TTL = 300; 
const RATE_LIMIT_WINDOW = 60; 
const MAX_REQUESTS = 5; 



const rateLimit = async (req, res, next) => {
  const realIp = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip; // Get real user IP
  const userId = req.user?.id || realIp; // Use user ID if authenticated, else fallback to real IP
  const key = `rate_limit_${userId}`;

  try {
    // Increment request count
    const requests = await redisClient.incr(key);

    // Get remaining TTL
    let ttl = await redisClient.ttl(key);
    if (ttl === -1) {
      await redisClient.expire(key, RATE_LIMIT_WINDOW); // Ensure expiration is set
      ttl = RATE_LIMIT_WINDOW;
    }

    // If request limit exceeded
    if (requests > MAX_REQUESTS) {
      res.set("Retry-After", ttl);
      return res.status(429).json({
        success: false,
        message: `Too many requests. Try again in ${ttl} seconds.`,
      });
    }

    // Set rate limit headers
    res.set("X-RateLimit-Limit", MAX_REQUESTS);
    res.set("X-RateLimit-Remaining", Math.max(0, MAX_REQUESTS - requests));
    res.set("X-RateLimit-Reset", ttl);

    next();
  } catch (error) {
    console.error("❌ Redis Rate Limit Error:", error);
    return res.status(500).json({ success: false, message: "Rate limiting failed." });
  }
};



// Helper function to get cache
const getCache = async (key) => {
  try {
    const cachedData = await redisClient.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
  } catch (err) {
    console.warn(`⚠️ Redis Read Error for ${key}:`, err.message);
    return null;
  }
};

// Helper function to set cache
const setCache = async (key, value) => {
  try {
    await redisClient.setEx(key, CACHE_TTL, JSON.stringify(value));
  } catch (err) {
    console.warn(`⚠️ Redis Write Error for ${key}:`, err.message);
  }
};

// Middleware to check cache for total downloads
const cacheTotalDownloads = async (req, res, next) => {
  const cachedData = await getCache("total_downloads");
  if (cachedData) {
    return res.status(200).json({ totalDownloads: cachedData });
  }
  next();
};

// Middleware to check cache for monthly downloads
const cacheMonthlyDownloads = async (req, res, next) => {
  const { month } = req.params;

  const cachedData = await getCache(`monthly_downloads_${month}`);

  if (cachedData) {
    return res.status(200).json({ month, downloads: cachedData });
  }
  next();
};

// Middleware to check cache for template-specific downloads
const cacheTemplateDownloads = async (req, res, next) => {
  const { templateId } = req.params;
  const cachedData = await getCache(`template_downloads_${templateId}`);
  if (cachedData) {
    return res.status(200).json({ templateId, downloads: cachedData });
  }
  next();
};

module.exports = {
  cacheTotalDownloads,
  cacheMonthlyDownloads,
  cacheTemplateDownloads,
  setCache,
  rateLimit,
};
