const Resume = require('../models/resume');
const mongoose = require('mongoose');

// Create a new resume with enhanced validation and logic
exports.createResume = async (req, res) => {
  try {
    // Destructure necessary fields from request body for validation
    const { title, content } = req.body;

    // Enforce unique title per user constraint
    const existingResume = await Resume.findOne({ userId: req.user._id, title });
    if (existingResume) {
      return res.status(400).json({ message: 'A resume with this title already exists.' });
    }

    // Basic structure validation based on schema
    if (!content || !content.basics || !content.basics.name || !content.basics.email) {
      return res.status(400).json({ message: 'Basic information is required in the content section.' });
    }

    const newResume = new Resume({
      userId: req.user._id,
      ...req.body,
      lastModified: new Date()
    });

    const savedResume = await newResume.save();
    res.status(201).json(savedResume);
  } catch (error) {
    res.status(500).json({ message: 'Error creating resume', error });
  }
};

// Get a resume by ID with field selection and advanced error handling
exports.getResumeById = async (req, res) => {
  try {
    // Ensuring proper ObjectId format to avoid Mongoose cast errors
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid resume ID' });
    }

    const resume = await Resume.findById(req.params.id).select('-__v -userId');

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving resume', error });
  }
};

// Get all resumes for a user with custom sorting and field filtering
exports.getAllResumes = async (req, res) => {
  try {
    // Adding custom sorting and filtering based on query parameters
    const sortBy = req.query.sortBy || 'lastModified';
    const order = req.query.order === 'asc' ? 1 : -1;

    const resumes = await Resume.find({ userId: req.user._id })
      .sort({ [sortBy]: order })
      .select('title lastModified templateId');

    if (resumes.length === 0) {
      return res.status(404).json({ message: 'No resumes found for this user' });
    }

    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving resumes', error });
  }
};

// Update a resume by ID with advanced logic
exports.updateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate ID format to avoid cast errors
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid resume ID' });
    }

    // Check for any date mismatch in work and project experiences
    if (updates.content) {
      if (updates.content.work) {
        updates.content.work.forEach(job => {
          if (job.endDate && job.startDate > job.endDate) {
            throw new Error('End date should be after the start date in work experience.');
          }
        });
      }

      if (updates.content.projects) {
        updates.content.projects.forEach(project => {
          if (project.endDate && project.startDate > project.endDate) {
            throw new Error('End date should be after the start date in projects.');
          }
        });
      }
    }

    const updatedResume = await Resume.findByIdAndUpdate(id, { ...updates, lastModified: new Date() }, { new: true });

    if (!updatedResume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(updatedResume);
  } catch (error) {
    res.status(500).json({ message: 'Error updating resume', error });
  }
};

// Delete a resume by ID with related cleanup logic
exports.deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if resume exists
    const resume = await Resume.findById(id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Enforce ownership
    if (resume.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized: Cannot delete this resume' });
    }

    // Deletion
    await resume.deleteOne();
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resume', error });
  }
};
