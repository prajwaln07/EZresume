const mongoose = require('mongoose');

const DownloadSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
  },
});

const Download = mongoose.model('Download', DownloadSchema);

module.exports = Download;
