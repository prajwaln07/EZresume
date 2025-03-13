const express = require('express');
const {
  trackDownload,
  getTotalDownloads,
  getMonthlyDownloads,
  getTemplateDownloads,
} = require('../controllers/downloadController');

const { checkRole, verifyToken } = require('../middleware/auth');
const {
  cacheTotalDownloads,
  cacheMonthlyDownloads,
  cacheTemplateDownloads,
} = require('../middleware/redis');

const router = express.Router();

router.post('/track', verifyToken, checkRole(['admin']), trackDownload);
router.get('/count', verifyToken, checkRole(['admin']), cacheTotalDownloads, getTotalDownloads);
router.get('/monthly/:month', verifyToken, checkRole(['admin']), cacheMonthlyDownloads, getMonthlyDownloads);
router.get('/template/:templateId', cacheTemplateDownloads, getTemplateDownloads);

module.exports = router;
