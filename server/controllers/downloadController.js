const Download = require('../models/downloadCnt'); // Ensure the model path is correct
const Template = require('../models/template'); // Ensure the template model path is correct

// Helper function to get the current month key
const getCurrentMonthKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

// Track a download
exports.trackDownload = async (req, res) => {
  const { templateId } = req.body; // Get the templateId from the request body

  if (!templateId) {
    return res.status(400).json({ success: false, message: 'Template ID is required' });
  }

  try {
    const currentMonth = getCurrentMonthKey(); // Get the current month key

    // Update the global and monthly download counts
    const globalRecord = await Download.findOneAndUpdate(
      {},
      {
        $inc: { count: 1, [`monthlyDownloads.${currentMonth}`]: 1 },
      },
      { upsert: true, new: true }
    );

    // Update the download count for the specific template
    const templateRecord = await Template.findByIdAndUpdate(
      templateId,
      { $inc: { downloads: 1 } },
      { new: true }
    );

    if (!templateRecord) {
      return res.status(404).json({ success: false, message: 'Template not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Download tracked successfully',
      totalDownloads: globalRecord.count,
      templateDownloads: templateRecord.downloads,
    });
  } catch (error) {
    console.error('Error tracking download:', error);
    res.status(500).json({ success: false, message: 'Failed to track download.' });
  }
};

// Fetch the total download count
exports.getTotalDownloads = async (req, res) => {
  try {
    const record = await Download.findOne({});
    const count = record ? record.count : 0;
    res.status(200).json({ totalDownloads: count });
  } catch (error) {
    console.error('Error fetching download count:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch download count.' });
  }
};

// Fetch downloads for a specific month
exports.getMonthlyDownloads = async (req, res) => {
  const { month } = req.params; // Format: YYYY-MM
  

  try {

    const record = await Download.findOne({});

    const monthlyDownloads = record?.monthlyDownloads?.get(month) || 0;

    res.status(200).json({ month, downloads: monthlyDownloads });
    
  } catch (error) {
    console.error('Error fetching monthly downloads:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch monthly downloads.' });
  }
};

// Fetch template-specific download counts
exports.getTemplateDownloads = async (req, res) => {
  const { templateId } = req.params;

  try {
    const templateRecord = await Template.findById(templateId);

    if (!templateRecord) {
      return res.status(404).json({ success: false, message: 'Template not found' });
    }

    res.status(200).json({
      templateId,
      downloads: templateRecord.downloads,
    });
  } catch (error) {
    console.error('Error fetching template-specific downloads:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch template-specific download count.',
    });
  }
};
