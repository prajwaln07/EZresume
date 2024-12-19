const express = require('express');
const Download = require('../models/downloadCnt'); // Make sure you have the Download model
const router = express.Router();

// Endpoint to track a download
router.post('/track', async (req, res) => {
  try {
    const record = await Download.findOneAndUpdate(
      {},
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    );
    res.status(200).json({ success: true, totalDownloads: record.count });
  } catch (error) {
    console.error('Error tracking download:', error);
    res.status(500).json({ success: false, message: 'Failed to track download.' });
  }
});

// Endpoint to fetch the download count
router.get('/count', async (req, res) => {
  try {
    const record = await Download.findOne({});
    const count = record ? record.count : 0;
    res.status(200).json({ totalDownloads: count });
  } catch (error) {
    console.error('Error fetching download count:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch download count.' });
  }
});

module.exports = router;
