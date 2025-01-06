import React from 'react';
import { Mail, Phone, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import {Linkedin,Github ,Globe   } from 'lucide-react';
import cleanUrl from '../utils';


const NextGenTemplate = ({ resumeInfo, resumeRef }) => {
  return (
    <div
      ref={resumeRef}
      className="shadow-lg h-full p-4 bg-white rounded-md font-serif text-gray-800"
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      {/* Header Section */}
      <div className="text-center pb-2 border-gray-300">
  <h1
    className="text-3xl font-bold"
    style={{ color: '#32CD32', fontFamily: 'Georgia, serif' }}
  >
    {resumeInfo?.firstName} {resumeInfo?.lastName}
  </h1>
  <hr className="border-t-2 border-gray-300 my-4" />
  <div className="grid grid-cols-3 gap-4 text-sm text-gray-500">
    {/* Address */}
    {resumeInfo?.address && (
      <p className="flex items-center gap-2">
        <MapPin size={16} /> {resumeInfo.address}
      </p>
    )}

    {/* Phone */}
    {resumeInfo?.phone && (
      <p className="flex items-center gap-2">
        <Phone size={16} /> {resumeInfo.phone}
      </p>
    )}

    {/* Email */}
    {resumeInfo?.email && (
      <p className="flex items-center gap-2">
        <Mail size={16} /> {resumeInfo.email}
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



      {/* Profile Summary */}
      {resumeInfo?.summery && (
        <div className="mb-8">
          <h2
            className="text-lg font-bold border-b-2 pb-2 mb-4"
            style={{ color: '#32CD32', fontFamily: 'Georgia, serif' }}
          >
            Profile
          </h2>
          <p
            className="text-sm leading-relaxed text-gray-700"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {resumeInfo.summery}
          </p>
        </div>
      )}

            {/* Education */}
            {resumeInfo?.education?.length > 0 && (
        <div className="mb-8">
          <h2
            className="text-lg font-bold border-b-2 pb-2 mb-4"
            style={{ color: '#32CD32', fontFamily: 'Georgia, serif' }}
          >
            Education
          </h2>
          {resumeInfo.education.map((edu) => (
            <div key={edu.id} className="mb-6">
              <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                <GraduationCap size={16} /> {edu.degree} in {edu.major}
              </h3>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{edu.universityName}</span>
                <span>{edu.startDate} - {edu.endDate}</span>
              </div>
              <p className="text-sm text-gray-700 mt-1">{edu.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Work Experience */}
      {resumeInfo?.experience?.length > 0 && (
  <div className="mb-8">
    <h2
      className="text-lg font-bold border-b-2 pb-2 mb-4"
      style={{ color: '#32CD32', fontFamily: 'Georgia, serif' }}
    >
      Experience
    </h2>
    {resumeInfo.experience.map((exp, index) => (
      <div key={index} className="mb-6">
        <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
          <Briefcase size={16} /> {exp.title}
        </h3>
        <div className="flex justify-between text-sm text-gray-600">
          <span>
            {exp.companyName}, {exp.city}, {exp.state}
          </span>
          <span>
            {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
          </span>
        </div>
        <div
                  className="text-sm text-gray-700 mt-2 [&>ul]:list-disc [&>ul]:pl-5 [&>li]:mb-1"
          style={{
            whiteSpace: 'normal', // Normalizes spacing for rich text
            wordWrap: 'break-word', // Prevents text overflow
            maxWidth: '100%', // Ensures content stays within bounds
          }}
          dangerouslySetInnerHTML={{ __html: exp.workSummery }}
        />
      </div>
    ))}
  </div>
)}

      {/* Projects */}
      {resumeInfo?.projects?.length > 0 && (
        <div className="mb-8">
          <h2
            className="text-lg font-bold border-b-2 pb-2 mb-4"
            style={{ color: '#32CD32', fontFamily: 'Georgia, serif' }}
          >
            Projects
          </h2>
          {resumeInfo.projects.map((project, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-800">{project.name}</p>
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




      {/* Technical Skills */}
      {resumeInfo?.skills?.length > 0 && (
        <div className="mb-8">
          <h2
            className="text-lg font-bold border-b-2 pb-2 mb-4"
            style={{ color: '#32CD32', fontFamily: 'Georgia, serif' }}
          >
            Skills & Abilities
          </h2>
          <ul className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            {resumeInfo.skills.map((skill, index) => (
              <li key={index} className="flex items-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    skill.rating * 20 > 75 ? 'bg-green-500 text-white' : 'bg-gray-300'
                  }`}
                >
                  {skill.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NextGenTemplate;
