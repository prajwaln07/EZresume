const cron = require('node-cron');
const Template = require('../models/template');

// Schedule the cron job to run every 3 days (cron expression: '0 0 */3 * *')
cron.schedule('0 0 */3 * *', async () => {  // Cron expression for every 3 days
    try {

        // Set the cutoff date to 3 days ago
        const cutoffDate = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000); // 3 days ago

        // Delete templates older than 3 days (based on the 'deletedAt' field)
        const result = await Template.deleteMany({ deletedAt: { $lt: cutoffDate } });

    } catch (error) {
        console.error('Error running cron job for template deletion:', error);
    }
});
