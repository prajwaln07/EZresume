import React from 'react';
import {dummy} from './dummy.css'
const DummyTemplate = () => {
  return (
    <div className="resume-container">
      <header className="header">
        <h1 className="name">John Doe</h1>
        <p className="title">Software Developer</p>
        <div className="contact-info">
          <p>Email: john.doe@example.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </header>
      
      <section className="section">
        <h2 className="section-title">About Me</h2>
        <p>
          Passionate about technology and software development. Experience working with a variety of technologies including JavaScript, React, and Node.js. Eager to tackle new challenges and continue learning.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">Work Experience</h2>
        <div className="work-item">
          <h3>Software Developer</h3>
          <p>XYZ Corp | Jan 2020 - Present</p>
          <ul>
            <li>Developed full-stack web applications using React and Node.js.</li>
            <li>Collaborated with cross-functional teams to improve user experience.</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Skills</h2>
        <ul>
          <li>JavaScript</li>
          <li>React</li>
          <li>Node.js</li>
          <li>Git</li>
        </ul>
      </section>

      <section className="section">
        <h2 className="section-title">Education</h2>
        <p>Bachelor's in Computer Science - ABC University</p>
      </section>
    </div>
  );
};

export default DummyTemplate;
