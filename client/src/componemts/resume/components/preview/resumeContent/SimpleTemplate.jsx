import React from 'react';

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
        <p className="text-sm text-gray-600 break-words">
          {resumeInfo?.phone} | {resumeInfo?.email} | {resumeInfo?.address}
        </p>
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

      {/* Professional Experience Section */}
      {resumeInfo?.experience?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 border-b-2 border-gray-200 pb-1 mb-4 text-center bg-blue-100">
            PROFESSIONAL EXPERIENCE
          </h2>
          {resumeInfo.experience.map((exp,index) => (
            <div key={index} className="mb-4">
              <h3 className="text-md font-bold text-black">{exp.title}</h3>
              <p className="text-sm text-gray-700">
                {exp.companyName} | {exp.city}, {exp.state}
              </p>
              <p className="text-sm text-gray-600">
                {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
              </p>
              <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
                {exp.workSummery?.split('\n').map((point, i) => (
                  <li key={i} className="ml-4 break-words">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
