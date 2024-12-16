import React, { useState } from 'react';
import DummyTemplate from '../componemts/DemmyTemplate'; // Correct the import path

const ResumeBuilder = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('dummyTemplate');
  
  // Editable states for the resume sections
  const [name, setName] = useState('John Doe');
  const [title, setTitle] = useState('Software Developer');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('(123) 456-7890');
  const [aboutMe, setAboutMe] = useState('Passionate about technology and software development...');
  const [workExperience, setWorkExperience] = useState([
    { position: 'Software Developer', company: 'XYZ Corp', duration: 'Jan 2020 - Present', tasks: ['Developed full-stack web applications', 'Collaborated with cross-functional teams'] }
  ]);
  const [skills, setSkills] = useState(['JavaScript', 'React', 'Node.js', 'Git']);
  const [education, setEducation] = useState("Bachelor's in Computer Science - ABC University");

  // Handle template change (if applicable)
  const handleTemplateChange = (e) => {
    setSelectedTemplate(e.target.value);
  };

  return (
    <div className="resume-builder-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className="resume-preview" style={{ flex: 1, padding: '20px' }}>
        {selectedTemplate === 'dummyTemplate' && (
          <DummyTemplate
            name={name}
            title={title}
            email={email}
            phone={phone}
            aboutMe={aboutMe}
            workExperience={workExperience}
            skills={skills}
            education={education}
          />
        )}
      </div>

      <div className="resume-editor" style={{ flex: 1, padding: '20px', borderLeft: '1px solid #ccc' }}>
        <h2>Edit Resume Sections</h2>

        <div className="edit-section">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="edit-section">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="edit-section">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="edit-section">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="edit-section">
          <label htmlFor="aboutMe">About Me:</label>
          <textarea
            id="aboutMe"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
          />
        </div>

        <div className="edit-section">
          <label htmlFor="workExperience">Work Experience:</label>
          {/* Add functionality for work experience */}
          <textarea
            id="workExperience"
            value={workExperience.map(exp => `${exp.position} at ${exp.company} - ${exp.duration}`).join('\n')}
            onChange={(e) => setWorkExperience([{ position: e.target.value, company: 'XYZ Corp', duration: 'Jan 2020 - Present', tasks: [] }])} // Simplified for now
          />
        </div>

        <div className="edit-section">
          <label htmlFor="skills">Skills:</label>
          <textarea
            id="skills"
            value={skills.join(', ')}
            onChange={(e) => setSkills(e.target.value.split(', '))}
          />
        </div>

        <div className="edit-section">
          <label htmlFor="education">Education:</label>
          <input
            type="text"
            id="education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
