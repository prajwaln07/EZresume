import React from 'react';
import {Linkedin,Github ,Globe   } from 'lucide-react';
import cleanUrl from '../utils';



const ClassicTemplate = ({ resumeInfo, resumeRef }) => {
  const formatWorkSummary = (summary) => {
    const lines = summary.split('\n');
    const bulletPointPattern = /^[\*\-\+]\s/;

    const htmlContent = lines.map((line) => {
      if (bulletPointPattern.test(line)) {
        return `<li class="ml-4">${line.replace(bulletPointPattern, '')}</li>`;
      } else {
        return `<p>${line}</p>`;
      }
    });

    return `<ul class="list-inside">${htmlContent.join('')}</ul>`;
  };

  return (
    <div ref={resumeRef} className="border-t-8 border-red-400 rounded-t-md p-5">
      {/* Personal Details */}
      <div className="mt-6">
  <h2
    className="font-bold text-xl text-center"
    style={{ color: resumeInfo?.themeColor }}
  >
    {resumeInfo?.firstName} {resumeInfo?.lastName}
  </h2>
  <h2 className="text-center text-sm font-medium">
    {resumeInfo?.jobTitle}
  </h2>
  <h2
    className="text-center font-normal text-xs"
    style={{ color: resumeInfo?.themeColor }}
  >
    {resumeInfo?.address}
  </h2>
  <div className="flex justify-between">
    <h2
      className="font-normal text-xs"
      style={{ color: resumeInfo?.themeColor }}
    >
      {resumeInfo?.phone}
    </h2>
    <h2
      className="font-normal text-xs"
      style={{ color: resumeInfo?.themeColor }}
    >
      {resumeInfo?.email}
    </h2>
  </div>
  <div className="flex justify-center gap-4 mt-2 text-xs text-gray-600">
    {resumeInfo?.github && (
      <div className="flex items-center gap-1">
        <Github size={14} />
        <a
          href={cleanUrl(resumeInfo.github)}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          GitHub
        </a>
      </div>
    )}
    {resumeInfo?.linkedin && (
      <div className="flex items-center gap-1">
        <Linkedin size={14} />
        <a
          href={cleanUrl(resumeInfo.linkedin)}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          LinkedIn
        </a>
      </div>
    )}
    {resumeInfo?.portfolio && (
      <div className="flex items-center gap-1">
        <Globe size={14} />
        <a
          href={cleanUrl(resumeInfo.portfolio)}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          Portfolio
        </a>
      </div>
    )}
  </div>
  <hr
    className="border-[1.5px] my-2"
    style={{ borderColor: resumeInfo?.themeColor }}
  />
</div>


      {/* Summary */}
      {resumeInfo?.summery && (
        <p className="text-xs">{resumeInfo?.summery}</p>
      )}

      {/* Education */}
      {resumeInfo?.education?.length > 0 && (
        <div className="my-6">
          <h2
            className="text-center font-bold text-sm mb-2"
            style={{ color: resumeInfo?.themeColor }}
          >
            Education
          </h2>
          <hr style={{ borderColor: resumeInfo?.themeColor }} />
          {resumeInfo.education.map((education, index) => (
            <div key={index} className="my-5">
              <h2
                className="text-sm font-bold"
                style={{ color: resumeInfo?.themeColor }}
              >
                {education.universityName}
              </h2>
              <h2 className="text-xs flex justify-between">
                {education?.degree} in {education?.major}
                <span>
                  {education?.startDate} - {education?.endDate}
                </span>
              </h2>
              <p className="text-xs my-2">{education?.description}</p>
            </div>
          ))}
        </div>
      )}

      

      {/* Professional Experience */}
      {resumeInfo?.experience?.length > 0 && (
  <div className="my-6">
    <h2
      className="text-center font-bold text-sm mb-2"
      style={{ color: resumeInfo?.themeColor }}
    >
      Professional Experience
    </h2>
    <hr style={{ borderColor: resumeInfo?.themeColor }} />
    {resumeInfo.experience.map((experience, index) => (
      <div key={index} className="my-5">
        <h2
          className="text-sm font-bold"
          style={{ color: resumeInfo?.themeColor }}
        >
          {experience?.title}
        </h2>
        <h2 className="text-xs flex justify-between">
          {experience?.companyName}, {experience?.city}, {experience?.state}
          <span>
            {experience?.startDate} To{' '}
            {experience?.currentlyWorking ? 'Present' : experience.endDate}
          </span>
        </h2>
        {/* Updated to handle HTML content from ReactQuill */}
        <div
  className="text-sm text-gray-700 mt-2 "
  dangerouslySetInnerHTML={{ __html: experience?.workSummery || '' }}
></div>

      </div>
      
    ))}
  </div>
)}
{/* Projects Section */}
{resumeInfo?.projects?.length > 0 && (
  <div className="my-6">
    <h2
      className="text-center font-bold text-sm mb-2"
      style={{ color: resumeInfo?.themeColor }}
    >
      Projects
    </h2>
    <hr style={{ borderColor: resumeInfo?.themeColor }} />
    {resumeInfo.projects.map((project, index) => (
      <div key={index} className="my-5">
        <div className="flex justify-between items-center">
          <h2
            className="text-sm font-bold"
            style={{ color: resumeInfo?.themeColor }}
          >
            {project.name}
          </h2>
          <div className="flex items-center gap-4">
            {project.link && (
              <a
                href={cleanUrl(project.link)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                <Globe size={16} />
              </a>
            )}
            {project.github && (
              <a
                href={cleanUrl(project.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                <Github size={16} />
              </a>
            )}
          </div>
        </div>
        <div className="flex justify-between text-xs mt-1">
          <p className="text-gray-600">{project.date}</p>
        </div>
        <div
          className="text-sm text-gray-700 mt-2 [&>ul]:list-disc [&>ul]:pl-5 [&>li]:mb-1"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />
        <p className="text-sm text-gray-600 mt-2">
          <strong>Technologies:</strong> {project.technologies.join(", ")}
        </p>
      </div>
    ))}
  </div>
)}



      {/* Skills */}
      {resumeInfo?.skills?.length > 0 && (
        <div className="my-6">
          <h2
            className="text-center font-bold text-sm mb-2"
            style={{ color: resumeInfo?.themeColor }}
          >
            Skills
          </h2>
          <hr style={{ borderColor: resumeInfo?.themeColor }} />
          <div className="grid grid-cols-2 gap-3 my-4">
            {resumeInfo.skills.map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                
                <h2 className="text-xs">{skill.name}</h2>
            
              </div>
            ))}
          </div>
        </div>
      )}

{/* Achievements Section */}
{resumeInfo?.achievements?.length > 0 && (
  <div className="my-6">
    <h2
      className="text-center font-bold text-sm mb-2"
      style={{ color: resumeInfo?.themeColor }}
    >
      Achievements
    </h2>
    <hr style={{ borderColor: resumeInfo?.themeColor }} />
    {resumeInfo.achievements.map((achievement, index) => (
      <div key={index} className="my-4">
        <h3
          className="text-sm font-bold"
          style={{ color: resumeInfo?.themeColor }}
        >
          {achievement.title}
        </h3>
        <p className="text-xs text-gray-700 mt-1">{achievement.description}</p>
      </div>
    ))}
  </div>
)}



    </div>
  );
};

export default ClassicTemplate;
