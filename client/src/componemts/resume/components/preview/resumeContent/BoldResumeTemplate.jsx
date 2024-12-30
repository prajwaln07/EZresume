import React from 'react';

const BoldResumeTemplate = ({ resumeInfo, resumeRef }) => {
  return (
    <div ref={resumeRef} className="p-8 bg-white text-gray-900 font-sans border-t-8">
      {/* Header Section */}
      <div className="text-center mb-8 border-b-2 pb-4">
        <h1 className="text-4xl font-bold tracking-widest uppercase mb-2" style={{ color: resumeInfo?.themeColor }}>
          {resumeInfo?.firstName} {resumeInfo?.lastName}
        </h1>
        <p className="text-lg uppercase tracking-wide font-medium mb-4">{resumeInfo?.jobTitle}</p>
        <div className="text-sm flex justify-center gap-4">
          <span>{resumeInfo?.phone}</span>
          <span>|</span>
          <span>{resumeInfo?.email}</span>
          <span>|</span>
          <span>{resumeInfo?.address}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 relative">
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
        </div>

        {/* Vertical Divider */}
        <div className="border-r-2 border-gray-300 absolute left-1/3 top-9 bottom-0"></div>

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

                  <ul className="text-sm list-disc pl-5 flex flex-wrap gap-2 items-start">
                    {exp.workSummery?.split('\n').map((line, i) => (
                      <li
                        key={i}
                        className="max-w-md break-words relative before:content-['•'] before:absolute before:-left-4 before:top-0"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>

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
