// server/controllers/versionControlController.js
const VersionControl = require('../models/version');
const Resume = require('../models/resume');

// Create a new version of a resume
exports.createVersion = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const { contentSnapshot } = req.body; // The new content for the version
        const resume = await Resume.findById(resumeId);

        if (!resume) {
            return res.status(404).send("Resume not found");
        }

        const versionCount = await VersionControl.countDocuments({ resumeId });
        const newVersion = await VersionControl.create({
            resumeId,
            versionNumber: versionCount + 1,
            contentSnapshot,
        });

        res.status(201).json(newVersion);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating version");
    }
};

// Get all versions of a specific resume
exports.getVersions = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const versions = await VersionControl.find({ resumeId }).sort({ createdAt: -1 });

        res.json(versions);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching versions");
    }
};

// Get a specific version by ID
exports.getVersionById = async (req, res) => {
    try {
        const { resumeId, versionId } = req.params;
        const version = await VersionControl.findOne({ _id: versionId, resumeId });

        if (!version) return res.status(404).send("Version not found");

        res.json(version);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching version");
    }
};
