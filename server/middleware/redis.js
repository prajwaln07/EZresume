const redisClient = require('../config/redisClient');

const CACHE_TTL = 300; // 5 minutes;;

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
  if (cachedData !== null) {
    return res.status(200).json({ totalDownloads: cachedData });
  }
  next();
};

// Middleware to check cache for monthly downloads
const cacheMonthlyDownloads = async (req, res, next) => {
  const { month } = req.params;
  const cachedData = await getCache(`monthly_downloads_${month}`);
  if (cachedData !== null) {
    return res.status(200).json({ month, downloads: cachedData });
  }
  next();
};

// Middleware to check cache for template-specific downloads
const cacheTemplateDownloads = async (req, res, next) => {
  const { templateId } = req.params;
  const cachedData = await getCache(`template_downloads_${templateId}`);
  if (cachedData !== null) {
    return res.status(200).json({ templateId, downloads: cachedData });
  }
  next();
};

module.exports = {
  cacheTotalDownloads,
  cacheMonthlyDownloads,
  cacheTemplateDownloads,
  setCache,
};
