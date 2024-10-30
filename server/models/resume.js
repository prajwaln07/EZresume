const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  templateId: { type: String, required: true },
  title: { type: String, maxLength: 100, required: true },
  content: {
    basics: {
      name: { type: String, maxLength: 100, required: true },
      label: { type: String, maxLength: 50 },
      email: { type: String, required: true, match: /.+\@.+\..+/ },
      phone: { type: String, maxLength: 15 },
      summary: { type: String },
      location: {
        address: { type: String },
        postalCode: { type: String },
        city: { type: String, required: true },
        countryCode: { type: String, required: true },
        region: { type: String }
      },
      profiles: [{
        network: { type: String, required: true },
        username: { type: String, required: true },
        url: { type: String, required: true, match: /https?:\/\/.+/ }
      }]
    },
    work: [{
      company: { type: String, maxLength: 100, required: true },
      position: { type: String, maxLength: 100, required: true },
      website: { type: String, match: /https?:\/\/.+/ },
      startDate: { type: Date, required: true },
      endDate: { type: Date },
      summary: { type: String },
      highlights: [{ type: String }]
    }],
    education: [{
      institution: { type: String, maxLength: 100, required: true },
      area: { type: String, maxLength: 100, required: true },
      studyType: { type: String, maxLength: 50, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date },
      gpa: { type: String, maxLength: 5 },
      courses: [{ type: String }]
    }],
    skills: [{ type: String }],
    certificates: [{
      name: { type: String, required: true },
      date: { type: Date, required: true },
      issuer: { type: String, required: true }
    }],
    projects: [{
      name: { type: String, required: true },
      description: { type: String },
      highlights: [{ type: String }],
      keywords: [{ type: String }],
      startDate: { type: Date, required: true },
      endDate: { type: Date },
      url: { type: String, match: /https?:\/\/.+/ }
    }],
    awards: [{
      title: { type: String, required: true },
      date: { type: Date, required: true },
      awarder: { type: String, required: true },
      summary: { type: String }
    }],
    languages: [{
      language: { type: String, required: true },
      fluency: { type: String, enum: ['basic', 'conversational', 'fluent', 'native'], required: true }
    }],
    interests: [{
      name: { type: String, required: true },
      keywords: [{ type: String }]
    }]
  },
  lastModified: { type: Date, default: Date.now }
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
