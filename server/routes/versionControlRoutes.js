// server/routes/versionControlRoutes.js
const express = require('express');
const router = express.Router();
const versionControlController = require('../controllers/versionControlController');
const { verifyToken } = require('../middleware/auth');

// Create a new version for a resume.
router.post('/:resumeId/versions', verifyToken, versionControlController.createVersion);

// Get all versions of a resume
router.get('/:resumeId/versions', verifyToken, versionControlController.getVersions);

// Get a specific version by ID
router.get('/:resumeId/versions/:versionId', verifyToken, versionControlController.getVersionById);

module.exports = router;
