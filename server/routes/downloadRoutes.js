const express = require('express');
const {
  trackDownload,
  getTotalDownloads,
  getMonthlyDownloads,
  getTemplateDownloads,
} = require('../controllers/downloadController'); 
const { checkRole,verifyToken } = require('../middleware/auth');



const router = express.Router();

router.post('/track',verifyToken,checkRole(['admin']), trackDownload);

router.get('/count', verifyToken,checkRole(['admin']),getTotalDownloads);

router.get('/monthly/:month', verifyToken,checkRole(['admin']),getMonthlyDownloads);

router.get('/template/:templateId', getTemplateDownloads);

module.exports = router;
