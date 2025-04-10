const Download = require('../models/downloadCnt'); 
const Template = require('../models/template');
const { setCache } = require('../middleware/redis');

// Helper function to get the current month key
const getCurrentMonthKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

exports.trackDownload = async (req, res) => {
  const { templateId } = req.body;

  if (!templateId) {
    return res.status(400).json({ success: false, message: 'Template ID is required' });
  }

  try {
    const currentMonth = getCurrentMonthKey();

    // Update global and monthly download counts..
    const globalRecord = await Download.findOneAndUpdate(
      {},
      { $inc: { count: 1, [`monthlyDownloads.${currentMonth}`]: 1 } }, // one for incrementing whole download count and one for that indivitual month 
      { upsert: true, new: true }
    );

    // Update specific template download count
    const templateRecord = await Template.findByIdAndUpdate(
      templateId,
      { $inc: { downloads: 1 } },
      { new: true }
    );

    if (!templateRecord) {
      return res.status(404).json({ success: false, message: 'Template not found' });
    }

    const newTotalDownloads = globalRecord.count;
    const newTemplateDownloads = templateRecord.downloads;



    res.status(200).json({
      success: true,
      message: 'Download tracked successfully',
      totalDownloads: newTotalDownloads,
      templateDownloads: newTemplateDownloads,
    });
  } catch (error) {
    console.error('Error tracking download:', error);
    res.status(500).json({ success: false, message: 'Failed to track download.' });
  }
};


// Fetch the total download count with Redis caching
exports.getTotalDownloads = async (req, res) => {
  try {
    const record = await Download.findOne({});
    const count = record ? record.count : 0;

    // Store in Redis
    setCache("total_downloads", count);

    res.status(200).json({ totalDownloads: count });
  } catch (error) {
    console.error('Error fetching total downloads:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch total downloads.' });
  }
};

// Fetch monthly downloads with Redis caching
exports.getMonthlyDownloads = async (req, res) => {

  const { month } = req.params;

  try {
    const record = await Download.findOne({});
    const monthlyDownloads = record?.monthlyDownloads?.get(String(month));
    // Store in Redis
    setCache(`monthly_downloads_${month}`, monthlyDownloads);

    res.status(200).json({ month, downloads: monthlyDownloads });
  } catch (error) {
    console.error('Error fetching monthly downloads:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch monthly downloads.' });
  }
};

// Fetch template-specific download counts with Redis caching
exports.getTemplateDownloads = async (req, res) => {
  const { templateId } = req.params;

  try {
    const templateRecord = await Template.findById(templateId);
    if (!templateRecord) {
      return res.status(404).json({ success: false, message: 'Template not found' });
    }

    // Store in Redis
    setCache(`template_downloads_${templateId}`, templateRecord.downloads);

    res.status(200).json({ templateId, downloads: templateRecord.downloads });
  } catch (error) {
    console.error('Error fetching template downloads:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch template downloads.' });
  }
};
