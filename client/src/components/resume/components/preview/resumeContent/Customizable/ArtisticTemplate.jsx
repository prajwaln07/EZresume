import React from "react";
import { Linkedin, Github, Globe } from "lucide-react";
import cleanUrl from "../../utils";

const ArtisticTemplate = ({ resumeInfo, resumeRef }) => {
  return (
    <div ref={resumeRef} className="p-8 bg-white text-black font-sans" style={{ width: "8.5in", minHeight: "11in" }}>
  {/* Header Section */}
  <div className="text-left mb-2">
    <h1 className="text-3xl font-bold text-center">
      {resumeInfo?.firstName} {resumeInfo?.lastName || "Your Name"}
    </h1>
    <p className="text-lg font-semibold text-gray-700 text-center">
      {resumeInfo?.jobTitle || "Professional Title"}
    </p>
    <div className="text-sm mt-1 text-gray-600 flex justify-center">
      {resumeInfo?.address || "Your Address"} | {resumeInfo?.phone || "Your Phone"} | {resumeInfo?.email || "Your Email"}
    </div>
    <div className="text-sm mt-2 text-gray-600 flex justify-start gap-6 flex justify-center">
      {resumeInfo?.github && (
        <div className="flex items-center gap-1">
          <Github size={14} />
          <a href={cleanUrl(resumeInfo.github)} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            GitHub
          </a>
        </div>
      )}
      {resumeInfo?.linkedin && (
        <div className="flex items-center gap-1">
          <Linkedin size={14} />
          <a href={cleanUrl(resumeInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            LinkedIn
          </a>
        </div>
      )}
      {resumeInfo?.portfolio && (
        <div className="flex items-center gap-1">
          <Globe size={14} />
          <a href={cleanUrl(resumeInfo.portfolio)} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            Portfolio
          </a>
        </div>
      )}
    </div>
  </div>

  {/* Content Grid Section */}
  <div className="grid grid-cols-2 gap-8"> {/* Always show two columns */}
    {/* Left Column */}
    <div className="lg:pr-4">
      {/* Summary Section */}
      {resumeInfo?.summery && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Summary</h2>
          <hr className="border-gray-300 mb-4" />
          <p className="text-sm leading-relaxed text-gray-700">{resumeInfo.summery}</p>
        </div>
      )}

      {/* Skills Section */}
      {resumeInfo?.skills && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Skills</h2>
          <hr className="border-gray-300 mb-4" />
          <ul className="list-disc pl-5 text-sm text-gray-600 grid grid-cols-2">
            {resumeInfo.skills.map((skill, index) => (
              <li className="col-span-1" key={index}>{skill.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Education Section */}
      {resumeInfo?.education && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Education</h2>
          <hr className="border-gray-300 mb-4" />
          {resumeInfo.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold flex justify-between">
                <span>{edu.universityName} | {edu.degree}</span>
                <span className="text-sm text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </span>
              </p>
              <p className="text-sm text-gray-600">Major: {edu.major}</p>
              {edu.description && <p className="text-sm mt-2 text-gray-600">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Right Column */}
    <div id="right-hand-sections" className="lg:pl-4">
      {/* Work Experience Section */}
      {resumeInfo?.experience && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Work Experience</h2>
          <hr className="border-gray-300 mb-4" />
          {resumeInfo.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-md font-semibold text-gray-800">{exp.title}</h3>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{exp.companyName}</span>
                <span>
                  {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                </span>
              </div>
              <div
                className="text-sm text-gray-700 mt-2 [&>ul]:list-disc [&>ul]:pl-5 [&>li]:mb-1"
                dangerouslySetInnerHTML={{ __html: exp.workSummery || "" }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Projects Section */}
      {resumeInfo?.projects && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Projects</h2>
          <hr className="border-gray-300 mb-4" />
          {resumeInfo.projects.map((project, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-800">{project.name}</p>
                <div className="flex items-center gap-4">
                  {project.link && (
                    <a href={cleanUrl(project.link)} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center gap-1">
                      <Globe size={14} />
                    </a>
                  )}
                  {project.github && (
                    <a href={cleanUrl(project.github)} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center gap-1">
                      <Github size={14} />
                    </a>
                  )}
                </div>
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
    </div>
  </div>
</div>

  );
};

export default ArtisticTemplate;
