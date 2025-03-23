import React from "react";
import { Mail, Phone, Github, Linkedin, Globe } from "lucide-react";
import cleanUrl from "../../utils";

const ArtisticTemplate = ({ resumeInfo, resumeRef }) => {
  return (
    <div
      ref={resumeRef}
      className="p-8 bg-white text-black font-popins"
      style={{ width: "8.5in", minHeight: "11in" }}
    >
      {/* Header Section */}
      <div className="text-center mb-2">
        <h1 className="text-4xl font-bold uppercase tracking-wide">
          <span className="text-5xl">
            {resumeInfo?.firstName?.charAt(0) || "P"}
          </span>
          {resumeInfo?.firstName?.slice(1)}{" "}
          <span className="text-5xl">
            {resumeInfo?.lastName?.charAt(0) || "N"}
          </span>
          {resumeInfo?.lastName?.slice(1) || "imbalkar"}
        </h1>

        <p className="text-lg font-medium mt-2">
          {resumeInfo?.address || "Pune, Maharashtra"}
        </p>
        <div className="text-base mt-1 flex justify-center gap-4">
          <span className="flex items-center gap-1">
            <Phone size={16} className="inline-block -mt-0.5" />
            {resumeInfo?.phone || "+91 9699939133"}
          </span>
          <span className="flex items-center gap-1">
            <a
              href={`mailto:${resumeInfo?.email || "prajwal.nimbalkar1910@gmail.com"}`}
              className="underline hover:text-blue-600"
            >
              <Mail size={16} className="inline-block -mt-0.5" />
              {resumeInfo?.email || "prajwal.nimbalkar1910@gmail.com"}
            </a>
          </span>
        </div>
        <div className="text-base mt-2 flex justify-center gap-6">
          {resumeInfo?.github && (
            <a
              href={cleanUrl(resumeInfo.github)}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-600 flex items-center gap-1"
            >
              <Github size={16} /> GitHub
            </a>
          )}
          {resumeInfo?.linkedin && (
            <a
              href={cleanUrl(resumeInfo.linkedin)}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-600 flex items-center gap-1"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
          )}
          {resumeInfo?.portfolio && (
            <a
              href={cleanUrl(resumeInfo.portfolio)}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-600 flex items-center gap-1"
            >
              <Globe size={16} /> Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Content Grid Section */}
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="lg:pr-4">
          {/* Summary Section */}
          {resumeInfo?.summery && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3 uppercase tracking-wide border-b-2 border-gray-300 pb-1">
                Summary
              </h2>
              <p className="text-sm leading-relaxed text-gray-700 indent-4">
                {resumeInfo.summery}
              </p>
            </div>
          )}

          {/* Skills Section */}
          {resumeInfo?.skills && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3 uppercase tracking-wide border-b-2 border-gray-300 pb-1">
                Skills
              </h2>
              <ul className="text-sm text-gray-700 grid grid-cols-2 gap-y-2">
                {resumeInfo.skills.map((skill, index) => (
                  <li className="col-span-1 list-inside list-disc" key={index}>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Education Section */}
          {resumeInfo?.education && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3 uppercase tracking-wide border-b-2 border-gray-300 pb-1">
                Education
              </h2>
              {resumeInfo.education.map((edu, index) => (
                <div key={index} className="mb-6">
                  <p className="font-semibold text-gray-800 text-md flex justify-between items-center">
                    <span>
                      {edu.universityName} — {edu.degree}
                    </span>
                    <span className="text-sm text-gray-600">
                      {edu.startDate} - {edu.endDate || "Present"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-medium">Major:</span> {edu.major}
                  </p>
                  {edu.description && (
                    <p className="text-sm mt-2 text-gray-600 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div id="right-hand-sections" className="lg:pl-4">
          {/* Work Experience Section */}
          {resumeInfo?.experience && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3 uppercase tracking-wide border-b-2 border-gray-300 pb-1">
                Work Experience
              </h2>
              {resumeInfo.experience.map((exp, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {exp.title}
                  </h3>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{exp.companyName}</span>
                    <span>
                      {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                    </span>
                  </div>
                  {exp.workSummery && (
                    <div
                      className="text-sm text-gray-700 mt-3 leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>li]:mb-1"
                      dangerouslySetInnerHTML={{ __html: exp.workSummery }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects Section */}
          {resumeInfo?.projects && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3 uppercase tracking-wide border-b-2 border-gray-300 pb-1">
                Projects
              </h2>
              {resumeInfo.projects.map((project, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold text-gray-800">{project.name}</p>
                    <div className="flex items-center gap-4">
                      {project.link && (
                        <a href={cleanUrl(project.link)} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                          <Globe size={16} />
                        </a>
                      )}
                      {project.github && (
                        <a href={cleanUrl(project.github)} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                          <Github size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 mt-2" dangerouslySetInnerHTML={{ __html: project.description }} />
                  <p className="text-sm text-gray-600 mt-2"><strong>Technologies:</strong> {project.technologies.join(", ")}</p>
                </div>
              ))}
            </div>
          )}

          {/* Achievements Section */}
          {resumeInfo?.achievements?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3 uppercase tracking-wide border-b-2 border-gray-300 pb-1">
                Achievements
              </h2>
              {resumeInfo.achievements.map((achievement, index) => (
                <div key={index} className="mb-4">
                  <p className="text-md font-bold">{achievement.title}</p>
                  <div className="text-sm text-gray-700 mt-2" dangerouslySetInnerHTML={{ __html: achievement.description }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtisticTemplate;
