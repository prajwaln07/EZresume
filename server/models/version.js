const mongoose = require('mongoose');

const versionControlSchema = new mongoose.Schema({
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', required: true }, // Reference to the associated resume
  versionNumber: { type: Number, required: true }, // Number indicating the version sequence
  contentSnapshot: { type: Object, required: true }, // Snapshot of the resume content for this specific version
  createdAt: { type: Date, default: Date.now }, // Timestamp for when this version was created
});

const VersionControl = mongoose.model('VersionControl', versionControlSchema);

module.exports = VersionControl;
