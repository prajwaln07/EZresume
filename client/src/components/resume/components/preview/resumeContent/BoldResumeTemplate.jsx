import React from 'react';
import { Linkedin, Github, Globe } from 'lucide-react';
import cleanUrl from '../utils';

const BoldResumeTemplate = ({ resumeInfo, resumeRef }) => {
  return (
    <div ref={resumeRef} className="p-8 bg-white text-gray-900 font-sans border-t-8">
      {/* Header Section */}
      <div className="text-center mb-8 border-b-2 pb-4">
        <h1 className="text-4xl font-bold tracking-widest uppercase mb-2" style={{ color: resumeInfo?.themeColor }}>
          {resumeInfo?.firstName} {resumeInfo?.lastName}
        </h1>
        <p className="text-lg uppercase tracking-wide font-medium mb-4">{resumeInfo?.jobTitle}</p>
        <div className="text-sm flex justify-center gap-4 mb-2">
          <span>{resumeInfo?.phone}</span>
          <span>|</span>
          <span>{resumeInfo?.email}</span>
          <span>|</span>
          <span>{resumeInfo?.address}</span>
        </div>

        {/* GitHub, LinkedIn, Portfolio Links */}
        <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
          {resumeInfo?.github && (
            <div className="flex items-center gap-1">
              <Github size={16} />
              <a href={cleanUrl(resumeInfo.github)} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                GitHub
              </a>
            </div>
          )}
          {resumeInfo?.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin size={16} />
              <a href={cleanUrl(resumeInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                LinkedIn
              </a>
            </div>
          )}
          {resumeInfo?.portfolio && (
            <div className="flex items-center gap-1">
              <Globe size={16} />
              <a href={cleanUrl(resumeInfo.portfolio)} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                Portfolio
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-1">
          {/* Education Section */}
          {resumeInfo?.education?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold uppercase border-b pb-2 mb-4" style={{ color: resumeInfo?.themeColor }}>Education</h2>
              {resumeInfo.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <p className="text-sm font-bold">{edu.degree} in {edu.major}</p>
                  <p className="text-xs text-gray-600">{edu.universityName}</p>
                  <p className="text-xs">{edu.startDate} - {edu.endDate}</p>
                  <p className="text-xs mt-2">{edu.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Skills Section */}
          {resumeInfo?.skills?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold uppercase border-b pb-2 mb-4" style={{ color: resumeInfo?.themeColor }}>Skills</h2>
              <ul className="text-sm list-disc list-inside">
                {resumeInfo.skills.map((skill, index) => (
                  <li key={index} className="mb-1">{skill.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Achievements Section */}
          {resumeInfo?.achievements?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold uppercase border-b pb-2 mb-4" style={{ color: resumeInfo?.themeColor }}>Achievements</h2>
              {resumeInfo.achievements.map((achievement, index) => (
                <div key={index} className="mb-4">
                  <p className="text-md font-bold">{achievement.title}</p>
                  <div className="text-sm text-gray-700 mt-2" dangerouslySetInnerHTML={{ __html: achievement.description }} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2 pl-8">
          {/* Summary Section */}
          {resumeInfo?.summery && (
            <div className="mb-8">
              <h2 className="text-lg font-bold uppercase border-b pb-2 mb-4" style={{ color: resumeInfo?.themeColor }}>Summary</h2>
              <p className="text-sm leading-relaxed">{resumeInfo.summery}</p>
            </div>
          )}

          {/* Experience Section */}
          {resumeInfo?.experience?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold uppercase border-b pb-2 mb-4" style={{ color: resumeInfo?.themeColor }}>Experience</h2>
              {resumeInfo.experience.map((exp, index) => (
                <div key={index} className="mb-6">
                  <p className="text-sm font-bold">{exp.title}</p>
                  <p className="text-xs text-gray-600">{exp.companyName}, {exp.city}, {exp.state}</p>
                  <p className="text-xs mb-2">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</p>
                  <div className="text-sm text-gray-700 mt-2 [&>ul]:list-disc [&>ul]:pl-5 [&>li]:mb-1" dangerouslySetInnerHTML={{ __html: exp.workSummery }} />
                </div>
              ))}
            </div>
          )}

          {/* Projects Section */}
          {resumeInfo?.projects?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold uppercase border-b pb-2 mb-4" style={{ color: resumeInfo?.themeColor }}>Projects</h2>
              {resumeInfo.projects.map((project, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{project.name}</p>
                    <div className="flex items-center gap-4">
                      {project.link && (
                        <a href={cleanUrl(project.link)} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center gap-1">
                          <Globe size={16} />
                        </a>
                      )}
                      {project.github && (
                        <a href={cleanUrl(project.github)} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center gap-1">
                          <Github size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 mt-2 [&>ul]:list-disc [&>ul]:pl-5 [&>li]:mb-1" dangerouslySetInnerHTML={{ __html: project.description }} />
                  <p className="text-sm text-gray-600 mt-2"><strong>Technologies:</strong> {project.technologies.join(', ')}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoldResumeTemplate;
