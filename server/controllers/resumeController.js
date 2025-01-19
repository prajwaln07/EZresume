const Resume = require('../models/resume');
const mongoose = require('mongoose');
const pdfkit = require('pdfkit');
const User=require('../models/user');
const axios = require('axios');



exports.createResume = async (req, res) => {
  const { title, content, templateId } = req.body;

  // Handle unauthenticated user: PDF generation only.
  if (!req.user) {
    try {
      const resumeFile = await generateResumeFile(title, content, templateId);
      res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
      return res.send(resumeFile);
    } catch (error) {
      return res.status(500).json({ message: 'Error generating resume file', error });
    }
  }

  // Handle authenticated user: Create a new resume in the database and generate a PDF
  const userId = new mongoose.Types.ObjectId(req.user.userId);
  const templateObjectId = new mongoose.Types.ObjectId(templateId);

  try {
    const newResume = new Resume({
      userId,
      title,
      content,
      templateId: templateObjectId,
      lastModified: new Date(),
    });
    await newResume.save();
    try{
      const updatedUserResume = await User.findByIdAndUpdate(userId,{
        $push:{resumes :newResume._id}
      })
    }
catch(err){
  console.log("error while adding new resume entry to user schema ,",err);
}

    const resumeFile = await generateResumeFile(newResume.title, newResume.content, newResume.templateId);
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    return res.status(201).json({ message: 'Resume created successfully.', resume: newResume, resumeFile });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating resume...', error });
  }
};

// Function to generate the resume file.
async function generateResumeFile(title, content, templateId) {
  const doc = new pdfkit();
  const buffers = [];

  // Store the generated PDF into a buffer
  doc.on('data', buffers.push.bind(buffers));
  
  // Ensure the PDF generation completes before resolving
  const pdfDataPromise = new Promise((resolve) => {
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });
  });

  // Add content to the PDF document
  doc.fontSize(25).text(title, { align: 'center' });
  doc.moveDown();

  // Assuming content is an object with various resume sections
  if (content.basics) {
    if (content.basics.name) {
      doc.fontSize(20).text(`Name: ${content.basics.name}`);
    }
    if (content.basics.email) {
      doc.fontSize(20).text(`Email: ${content.basics.email}`);
    }
    // Add additional fields from content as needed
  }

  // Finalize the PDF document
  doc.end();

  // Wait for the PDF generation to complete and return the buffer
  return pdfDataPromise;
}
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
    // Retrieve the user by their ID
    let tempId=req.user.userId;
    tempId = new mongoose.Types.ObjectId(tempId);
    const userResumes = await User.findById(tempId).select('resumes')
.populate({
  path:'resumes'
})

    

    if (!userResumes || userResumes.resumes.length === 0) {
      return res.status(404).json({ message: 'No resumes found for this user' });
    }

    res.json(userResumes);
  } catch (error) {
    console.error('Error retrieving resumes:', error); // Log the actual error
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

// Delete a resume by ID with related cleanup logic ....
exports.deleteResume = async (req, res) => {
  try {
    let { id } = req.params;
id=new mongoose.Types.ObjectId(id);
    // Check if resume exists
    const resumeTobeDeleted = await Resume.findById(id);
    if (!resumeTobeDeleted) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Enforce ownership
    if (resumeTobeDeleted.userId.toString() !== req.user.userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized: Cannot delete this resume' });
    }

    // Deletion
    await resumeTobeDeleted.deleteOne();
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error deleting resume', error });
  }
};





const calculateReadability = (text) => {
  const sentences = text.split('.').length;
  const words = text.split(' ').length;
  const syllables = text.split(' ').reduce((acc, word) => acc + countSyllables(word), 0);
  const readabilityScore = 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words));
  return readabilityScore.toFixed(2);
};
// Function to count syllables in a word (basic approach)
const countSyllables = (word) => {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  const syllablePattern = /[aeiouy]{1,2}/g;
  const syllables = word.match(syllablePattern);
  return syllables ? syllables.length : 1;
};
exports.getSuggestions = async (req, res) => {
  try {
    // Destructure the body to get the text that needs spell checking
    const { summery, experience, education, skills, projects } = req.body.text;
    // Ensure each section is at least an empty array if undefined and join text content
    const experienceText = (experience || []).map(exp => exp.workSummery).join(' ');
    const educationText = (education || []).map(edu => edu.description).join(' ');
    const skillsText = (skills || []).map(skill => skill.name).join(' ');
    const projectsText = (projects || []).map(proj => proj.description).join(' ');
    // Concatenate all the text content from various sections
    const contentToCheck = `${summery} ${experienceText} ${educationText} ${skillsText} ${projectsText}`;
    // Ensure content is available for spell-checking
    if (!contentToCheck) {
      return res.status(400).json({ message: "Text is required for spell checking." });
    }
    // LanguageTool API endpoint for spelling and grammar
    const apiUrl = "https://api.languagetool.org/v2/check";

    // Request to LanguageTool API
    const response = await axios.post(
      apiUrl,
      new URLSearchParams({
        text: contentToCheck,
        language: "en-US", // Specify the language
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    // Extract matches (suggestions) from the API response
    const matches = response.data.matches
      .map(match => ({
        word: match.context.text.substring(
          match.context.offset,
          match.context.offset + match.context.length
        ),
        suggestions: match.replacements.map(replacement => replacement.value),
        message: match.message,
        type: match.rule.issueType,  // Grammar or spelling
      }))
      .filter(item => item.suggestions.length > 0); // Filter out empty suggestions
    // Readability score: Flesch-Kincaid formula
    const readabilityScore = calculateReadability(contentToCheck);
    // Action verbs suggestion: Basic check for "action verbs"
    const actionVerbs = ['achieved', 'designed', 'managed', 'led', 'improved']; // Add more action verbs
    const actionVerbSuggestions = [];
    experience.forEach(exp => {
      actionVerbs.forEach(verb => {
        if (exp.workSummery && exp.workSummery.includes(verb)) {
          actionVerbSuggestions.push({
            word: verb,
            message: `Consider using stronger verbs like "led" or "improved" for better impact.`,
          });
        }
      });
    });
    // Combine all suggestions
    const combinedSuggestions = [...matches, ...actionVerbSuggestions];
    // Send suggestions back to the client

    res.status(200).json({
      errors: combinedSuggestions,
      readabilityScore,
    });
  } catch (error) {
    console.error("Error fetching suggestions:", error.message);
    res.status(500).json({ message: "Failed to fetch suggestions." });
  }
};

