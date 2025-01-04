import React from "react";
import parse from 'html-react-parser';
import {Linkedin,Github ,Globe   } from 'lucide-react';
const cleanUrl = (url) => {
  return url ? url.trim().replace(/<.*?>/g, '') : '';
};

const MicrosoftTemplate = ({ resumeInfo, resumeRef }) => {
  return (
    <div
      ref={resumeRef}
      className="p-8 bg-white text-black font-sans"
      style={{ width: "7.8in", minHeight: "11in" }}
    >
      {/* Header Section */}
      <div className="text-left mb-6">
  <h1 className="text-3xl font-bold">
    {resumeInfo?.firstName} {resumeInfo?.lastName || "Your Name"}
  </h1>
  <p className="text-lg font-semibold text-gray-700">
    {resumeInfo?.jobTitle || "Professional Title"}
  </p>
  <p className="text-sm mt-1 text-gray-600">
    {resumeInfo?.address || "Your Address"} | {resumeInfo?.phone || "Your Phone"} |{" "}
    {resumeInfo?.email || "Your Email"}
  </p>
  <div className="text-sm mt-2 text-gray-600 flex  justify-start gap-6">
    {/* GitHub */}
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

    {/* LinkedIn */}
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

    {/* Portfolio */}
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
</div>


      {/* Summary Section */}
      {resumeInfo?.summery && (
        <div className="mb-6">
          <h2 className="text-lg font-bold">Summary</h2>
          <hr className="my-2 border-gray-300" />
          <p className="text-sm leading-relaxed text-gray-700">{resumeInfo.summery}</p>
        </div>
      )}

      {/* Experience Section */}
      {resumeInfo?.experience?.length > 0 && (
  <div className="mb-6">
    <h2 className="text-lg font-bold">Experience</h2>
    <hr className="my-2 border-gray-300" />
    {resumeInfo.experience.map((exp, index) => (
      <div key={index} className="mb-4">
        <div className="flex justify-between items-start">
          <p className="font-semibold">
            {exp.title} | {exp.companyName}
          </p>
          <p className="text-sm">
            {exp.startDate} - {exp.endDate || (exp.currentlyWorking ? "Present" : "")}
          </p>
        </div>
        <div
          className="text-sm text-gray-700 mt-2 [&>ul]:list-disc [&>ul]:pl-5 [&>li]:mb-1"

          dangerouslySetInnerHTML={{ __html: exp.workSummery }}
        />
      </div>
    ))}
  </div>
)}

      {/* Education Section */}
      {resumeInfo?.education?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold">Education</h2>
          <hr className="my-2 border-gray-300" />
          {resumeInfo.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">
                {edu.universityName} | {edu.degree}
              </p>
              <p className="text-sm text-gray-600">Major: {edu.major}</p>
              <p className="text-sm">{edu.startDate} - {edu.endDate}</p>
              {edu.description && (
                <p className="text-sm mt-2 text-gray-600">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills Section */}
      {resumeInfo?.skills?.length > 0 && (
        <div>
          <h2 className="text-lg font-bold">Skills & Abilities</h2>
          <hr className="my-2 border-gray-300" />
          <ul className="list-disc pl-5 text-sm text-gray-600">
            {resumeInfo.skills.map((skill, index) => (
              <li key={index} className="break-words">{skill.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MicrosoftTemplate;
