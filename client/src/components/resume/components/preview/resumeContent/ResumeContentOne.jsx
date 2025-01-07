import React from 'react';
import { Mail, Phone, Globe, MapPin, Linkedin, Briefcase, GraduationCap, Github, Calendar, CheckCircle } from 'lucide-react';
import cleanUrl from '../utils';

const ResumeContent = ({ resumeInfo, resumeRef }) => {
  return (
    <div ref={resumeRef} className="shadow-lg h-full p-14 bg-gray-100 rounded-md">
      {/* Personal Details */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">
          {resumeInfo?.firstName} {resumeInfo?.lastName}
        </h1>
        <h2 className="text-lg font-medium mt-1">
          {resumeInfo?.jobTitle}
        </h2>
        <div className="flex justify-center gap-4 mt-2">
          {resumeInfo?.phone && (
            <div className="flex items-center gap-1">
              <Phone size={16} />
              <span>{resumeInfo.phone}</span>
            </div>
          )}
          {resumeInfo?.email && (
            <div className="flex items-center gap-1">
              <Mail size={16} />
              <span>{resumeInfo.email}</span>
            </div>
          )}
          {resumeInfo?.address && (
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>{resumeInfo.address}</span>
            </div>
          )}
        </div>

        <div className="flex justify-around gap-4 mt-2">
          {resumeInfo?.github && (
            <div className="flex items-center gap-1">
              <Github size={16} />
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
              <Linkedin size={16} />
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
              <Globe size={16} />
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
      </div>

      {/* Summary */}
      {resumeInfo?.summery && (
        <div className="my-4">
          <h2 className="text-xl font-bold border-b-2 pb-1 mb-2">Summary of Qualifications</h2>
          <p className="text-sm leading-relaxed">{resumeInfo.summery}</p>
        </div>
      )}

            {/* Education */}
            {resumeInfo?.education?.length > 0 && (
        <div className="my-4">
          <h2 className="text-xl font-bold border-b-2 pb-1 mb-2">Education</h2>
          {resumeInfo.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-1">
                <GraduationCap size={16} /> {edu?.degree} in {edu?.major}
              </h3>
              <div className="flex justify-between">
                <h4 className="text-sm font-medium">{edu?.universityName}</h4>
                <span className="text-sm flex items-center gap-1">
                  <Calendar size={16} /> {edu?.startDate} - {edu?.endDate}
                </span>
              </div>
              <p className="text-sm mt-2">{edu?.description}</p>
            </div>
          ))}
        </div>
      )}


      {/* Experience */}
      {resumeInfo?.experience?.length > 0 && (
        <div className="my-4">
          <h2 className="text-xl font-bold border-b-2 pb-1 mb-2">Experience</h2>
          {resumeInfo.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold flex items-center gap-1">
                  <Briefcase size={16} /> {exp?.title}
                </h3>
                <span className="text-sm flex items-center gap-1">
                  <Calendar size={16} /> {exp?.startDate} - {exp?.currentlyWorking ? 'Present' : exp?.endDate}
                </span>
              </div>
              <h4 className="text-sm font-medium flex items-center gap-1 mt-1">
                <MapPin size={16} /> {exp?.companyName}, {exp?.city}, {exp?.state}
              </h4>
              <div
                className="text-sm text-gray-700 mt-2 [&>ul]:list-disc [&>ul]:pl-5 [&>li]:mb-1"
                dangerouslySetInnerHTML={{ __html: exp.workSummery }}
              />
            </div>
          ))}
        </div>
      )}

            {/* Projects */}
            {resumeInfo?.projects?.length > 0 && (
        <div className="my-4">
          <h2 className="text-xl font-bold border-b-2 pb-1 mb-2">Projects</h2>
          {resumeInfo.projects.map((project, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-center">
                <p className="font-semibold">{project.name}</p>
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


      {/* Skills */}
      {resumeInfo?.skills?.length > 0 && (
        <div className="my-4">
          <h2 className="text-xl font-bold border-b-2 pb-1 mb-2">Technical Skills</h2>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {resumeInfo.skills.map((skill, index) => (
              <li key={index} className="flex items-center gap-1">
                <CheckCircle size={16} /> {skill?.name}
              </li>
            ))}
          </ul>
        </div>
      )}


    </div>
  );
};

export default ResumeContent;
