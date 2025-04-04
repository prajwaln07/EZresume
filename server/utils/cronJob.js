const cron = require('node-cron');
const Template = require('../models/template');

// Schedule the cron job to run every 7 days (cron expression: '0 0 */7 * *')
cron.schedule('0 0 */7 * *', async () => {  // Cron expression for every 7 days
    try {

        // Set the cutoff date to 7 days ago
        const cutoffDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); //7 days ago

        // Delete templates older than 3 days (based on the 'deletedAt' field)
        const result = await Template.deleteMany({ deletedAt: { $lt: cutoffDate } });

    } catch (error) {
        console.error('Error running cron job for template deletion:', error);
    }
});
