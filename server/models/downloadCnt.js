const mongoose = require('mongoose');

const DownloadSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0, // Total download count
  },
  monthlyDownloads: {
    type: Map,
    of: Number, // Key: month (e.g., "2025-01"), Value: number of downloads
    default: {}, // Initialize as an empty object
  },
});

const Download = mongoose.model('Download', DownloadSchema);

module.exports = Download;
