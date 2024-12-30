import React from 'react';
import { Mail, Phone, Briefcase, GraduationCap, CheckCircle } from 'lucide-react';

const ModernResumeTemplate = ({ resumeInfo, resumeRef }) => {
  return (
    <div ref={resumeRef} className="shadow-lg h-full p-10 bg-white rounded-md font-sans">
      {/* Header Section */}
      <div className="text-center border-b-2 pb-4 mb-6">
        <h1 className="text-4xl font-bold text-gray-800">
          {resumeInfo?.firstName} {resumeInfo?.lastName}
        </h1>
        <h2 className="text-lg font-medium text-gray-600 mt-1">{resumeInfo?.jobTitle}</h2>
        <div className="flex justify-center gap-6 mt-2 text-gray-600">
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
        </div>
      </div>

      {/* Profile Summary */}
      {resumeInfo?.summery && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-400 border-b-2 pb-1 mb-2">Profile Summary</h2>
          <p className="text-gray-700 leading-relaxed text-sm">{resumeInfo.summery}</p>
        </div>
      )}

      {/* Work Experience */}
      {resumeInfo?.experience?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-400 border-b-2 pb-1 mb-2">Work Experience</h2>
          {resumeInfo.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-1">
                <Briefcase size={16} /> {exp?.title}
              </h3>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{exp?.companyName}</span>
                <span>
                  {exp?.startDate} - {exp?.currentlyWorking ? 'Present' : exp?.endDate}
                </span>
              </div>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 flex flex-wrap gap-2 items-start">
                {exp?.workSummery?.split('\n').map((point, i) => (
                  <li
                    key={i}
                    className="break-words max-w-full relative before:content-['•'] before:absolute before:-left-4 before:top-0"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resumeInfo?.education?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-400 border-b-2 pb-1 mb-2">Education</h2>
          {resumeInfo.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-1">
                <GraduationCap size={16} /> {edu?.degree} in {edu?.major}
              </h3>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{edu?.universityName}</span>
                <span>
                  {edu?.startDate} - {edu?.endDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Technical Skills */}
      {resumeInfo?.skills?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-400 border-b-2 pb-1 mb-2">Technical Skills</h2>
          <ul className="grid grid-cols-2 gap-2 text-sm text-gray-700">
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

export default ModernResumeTemplate;
