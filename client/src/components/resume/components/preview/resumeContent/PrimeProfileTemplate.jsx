import React from "react";
import {Linkedin,Github ,Globe   } from 'lucide-react';
import cleanUrl from '../utils';


const PrimeProfileTemplate = ({ resumeInfo, resumeRef }) => {
  return (
    <div
      ref={resumeRef}
      style={{ fontFamily: "Arial, sans-serif" }}
      className="flex"
    >
      {/* Left Sidebar */}
      <div
        className="w-1/12 flex-none"
        style={{
          backgroundColor: resumeInfo?.themeColor || "#ff6666",
          minHeight: "100%",
          height: "auto",
        }}
      ></div>

      {/* Main Content */}
      <div className="w-5/6 px-10 py-5 min-h-screen">
        {/* Header */}
        <div className="text-center mb-5">
  <h1 className="text-4xl font-bold uppercase">{`${resumeInfo?.firstName} ${resumeInfo?.lastName}`}</h1>
  <p className="text-sm mt-2">{resumeInfo?.address}</p>
  <p className="text-sm">
    {resumeInfo?.phone} | {resumeInfo?.email}
  </p>
  <div className="grid grid-cols-3 gap-4 text-sm text-black mt-4">
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
            <p className="text-sm">{resumeInfo.summery}</p>
          </div>
        )}

          
        {/* Education Section */}
        {resumeInfo?.education?.length > 0 && (
          <div className="mb-6">
            <h2
              className="text-lg font-bold mb-2 uppercase"
              style={{ color: resumeInfo?.themeColor }}
            >
              Education
            </h2>
            {resumeInfo.education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <p className="text-md font-bold">
                  {edu.degree} in {edu.major}
                </p>
                <p className="text-sm">
                  {edu.universityName} | {edu.startDate} - {edu.endDate}
                </p>
                <p className="text-sm mt-2">{edu.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Experience Section */}
        {resumeInfo?.experience?.length > 0 && (
  <div className="mb-6">
    <h2
      className="text-lg font-bold mb-2 uppercase"
      style={{ color: resumeInfo?.themeColor }}
    >
      Experience
    </h2>
    {resumeInfo.experience.map((exp, index) => (
      <div key={index} className="mb-4">
        <p className="text-md font-bold">{exp.title}</p>
        <p className="text-sm">
          {exp.companyName} | {exp.city}, {exp.state} |{" "}
          {exp.startDate} -{" "}
          {exp.currentlyWorking ? "Present" : exp.endDate}
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
            <h2
              className="text-lg font-bold mb-2 uppercase"
              style={{ color: resumeInfo?.themeColor }}
            >
              Projects
            </h2>
            {resumeInfo.projects.map((project, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-center">
                  <p className="text-md font-bold">{project.name}</p>
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
          <div className="">
            <h2
              className="text-lg font-bold mb-2 uppercase"
              style={{ color: resumeInfo?.themeColor }}
            >
              Skills
            </h2>
            <ul className="list-disc pl-5 flex flex-wrap ">
              {resumeInfo.skills.map((skill, index) => (
                <li key={index} className="text-sm w-1/2">
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrimeProfileTemplate;
