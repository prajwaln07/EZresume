const redisClient = require('../config/redisClient');

const CACHE_TTL = 300; // 5 mins cache to live ,after 5 min cached data will be removed 
const RATE_LIMIT_WINDOW = 60; // rate limiting window ,only 5 req are allowed within 1 minute
const MAX_REQUESTS = 5; // no of req allowed ,,,we have allowed only 5 req in single minute 



const rateLimit = async (req, res, next) => {
  const realIp = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip; // Get real user IP
  const userId = req.user?.userId || realIp; // Use user ID if authenticated, else fallback to real IP
  const key = `rate_limit_${userId}`;

  try {
    // Increment request count
    const requests = await redisClient.incr(key);

    let ttl = await redisClient.ttl(key); // tells us remaining time ,if it is expired then -2 or if it is -1 then it means we have not settled expire time.
    
    if (ttl === -1) { // -1 means that we havenlt assigned time to that key.
      await redisClient.expire(key, RATE_LIMIT_WINDOW);
      ttl = RATE_LIMIT_WINDOW;
    }
    
    // If request limit exceeded
    if (requests > MAX_REQUESTS) {
      res.set("Retry-After", ttl); // this will be utilized at client side using res.headers.get 
      return res.status(429).json({
        success: false,
        message: `Too many requests. Try again in ${ttl} seconds.`,
      });
    }

    next();
  } catch (error) {
    console.error(" Redis Rate Limit Error:", error);
    return res.status(500).json({ success: false, message: "Rate limiting failed." });
  }
};



const getCache = async (key) => {
  try {
    const cachedData = await redisClient.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
  } catch (err) {
    console.warn(`Redis Read Error for ${key}:`, err.message);
    return null;
  }
};

const setCache = async (key, value) => {
  try {
    await redisClient.setEx(key, CACHE_TTL, JSON.stringify(value)); // always remember to pass 2nd parameter as cache_ttl whenever used setEx.
  } catch (err) {
    console.warn(`Redis Write Error for ${key}:`, err.message);
  }
};

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
