import React from 'react';
import {Linkedin,Github ,Globe,Phone,Mail, MapPin  } from 'lucide-react';
import cleanUrl from '../utils';


const SimpleTemplate = ({ resumeInfo, resumeRef }) => {
  return (
    <div
      ref={resumeRef}
      className="w-full max-w-4xl mx-auto p-8 bg-white border border-gray-300 rounded-md font-sans text-gray-800 overflow-x-hidden"
    >
      {/* Header Section */}
      <div className="text-center mb-6">
  <h1 className="text-2xl font-bold uppercase text-black break-words">
    {resumeInfo?.firstName} {resumeInfo?.lastName}
  </h1>
  <p className="text-md font-medium text-gray-700">{resumeInfo?.jobTitle}</p>
  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mt-2">
    {/* Phone */}
    {resumeInfo?.phone && (
      <p className="flex items-center gap-2">
        <Phone size={16} />
        {resumeInfo.phone}
      </p>
    )}

    {/* Email */}
    {resumeInfo?.email && (
      <p className="flex items-center gap-2">
        <Mail size={16} />
        {resumeInfo.email}
      </p>
    )}

    {/* Address */}
    {resumeInfo?.address && (
      <p className="flex items-center gap-2">
        <MapPin size={16} />
        {resumeInfo.address}
      </p>
    )}

    {/* GitHub */}
    {resumeInfo?.github && (
      <p className="flex items-center gap-2">
        <Github size={16} />
        <a
          href={cleanUrl(resumeInfo.github)}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          GitHub
        </a>
      </p>
    )}

    {/* LinkedIn */}
    {resumeInfo?.linkedin && (
      <p className="flex items-center gap-2">
        <Linkedin size={16} />
        <a
          href={cleanUrl(resumeInfo.linkedin)}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          LinkedIn
        </a>
      </p>
    )}

    {/* Portfolio */}
    {resumeInfo?.portfolio && (
      <p className="flex items-center gap-2">
        <Globe size={16} />
        <a
          href={cleanUrl(resumeInfo.portfolio)}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          Portfolio
        </a>
      </p>
    )}
  </div>
</div>


      {/* Summary Section */}
      {resumeInfo?.summery && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 border-b-2 border-gray-200 pb-1 mb-4 text-center bg-blue-100">
            SUMMARY
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed break-words">
            {resumeInfo.summery}
          </p>
        </div>
      )}

            {/* Education Section */}
            {resumeInfo?.education?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 border-b-2 border-gray-200 pb-1 mb-4 text-center bg-blue-100">
            EDUCATION
          </h2>
          {resumeInfo.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <h3 className="text-md font-bold text-black break-words">
                {edu.degree} in {edu.major}
              </h3>
              <p className="text-sm text-gray-700">{edu.universityName}</p>
              <p className="text-sm text-gray-600">
                {edu.startDate} - {edu.endDate}
              </p>
              <p className="text-sm text-gray-700 mt-1 break-words">{edu.description}</p>
            </div>
          ))}
        </div>
      )}


      {/* Professional Experience Section */}
      {resumeInfo?.experience?.length > 0 && (
  <div className="mb-6">
    <h2 className="text-lg font-semibold text-gray-700 border-b-2 border-gray-200 pb-1 mb-4 text-center bg-blue-100">
      PROFESSIONAL EXPERIENCE
    </h2>
    {resumeInfo.experience.map((exp, index) => (
      <div key={index} className="mb-4">
        <h3 className="text-md font-bold text-black">{exp.title}</h3>
        <p className="text-sm text-gray-700">
          {exp.companyName} | {exp.city}, {exp.state}
        </p>
        <p className="text-sm text-gray-600">
          {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
        </p>
        <div
                  className="text-sm text-gray-700 mt-2 [&>ul]:list-disc [&>ul]:pl-5 [&>li]:mb-1"
                  dangerouslySetInnerHTML={{ __html: exp.workSummery }}
        />
      </div>
    ))}
  </div>
)}



{/* Projects Section */}
{resumeInfo?.projects?.length > 0 && (
  <div className="mb-6">
    <h2 className="text-lg font-semibold text-gray-700 border-b-2 border-gray-200 pb-1 mb-4 text-center bg-blue-100">
      PROJECTS
    </h2>
    {resumeInfo.projects.map((project, index) => (
      <div key={index} className="mb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-bold text-black">{project.name}</h3>
          <div className="flex items-center gap-4">
            {project.link && (
              <a
                href={cleanUrl(project.link)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 flex items-center gap-1"
              >
                <Globe size={16} />
              </a>
            )}
            {project.github && (
              <a
                href={cleanUrl(project.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 flex items-center gap-1"
              >
                <Github size={16} />
              </a>
            )}
          </div>
        </div>
        <div
          className="text-sm text-gray-700 mt-2 [&>ul]:list-disc [&>ul]:pl-5 [&>li]:mb-1"
          style={{
            whiteSpace: "normal",
            wordWrap: "break-word",
            maxWidth: "100%",
          }}
          dangerouslySetInnerHTML={{ __html: project.description }}
        />
        <p className="text-sm text-gray-600 mt-2">
          <strong>Technologies:</strong> {project.technologies.join(", ")}
        </p>
      </div>
    ))}
  </div>
)}




      {/* Skills Section */}
      {resumeInfo?.skills?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg text-center bg-blue-100 font-semibold text-gray-700 border-b-2 border-gray-200 pb-1 mb-4">
            SKILLS
          </h2>
          <ul className="flex flex-wrap gap-4 text-sm text-gray-700">
            {resumeInfo.skills.map((skill, index) => (
              <li
                key={index}
                className="bg-gray-100 px-3 py-1 rounded-md shadow-sm break-words"
              >
                {skill.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SimpleTemplate;
