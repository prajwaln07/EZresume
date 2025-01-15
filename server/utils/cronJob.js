const cron = require('node-cron');
const Template =require('../models/template')


// Schedule the cron job to run every 40 seconds for testing
cron.schedule('*/40 * * * * *', async () => {  // Cron expression for every 40 seconds
    try {

        // Set the cutoff date to 40 seconds ago
        const cutoffDate = new Date(Date.now() - 3*24*60*60 * 1000); // 40 seconds ago

        // Delete templates older than 40 seconds (for testing purposes)
        const result = await Template.deleteMany({ deletedAt: { $lt: cutoffDate } });

    } catch (error) {
        console.error('Error running cron job for template deletion:', error);
    }
});

