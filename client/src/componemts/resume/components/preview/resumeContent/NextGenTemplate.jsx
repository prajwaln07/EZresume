import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Circle,
  Briefcase,
  GraduationCap
} from 'lucide-react';

const NextGenTemplate = ({ resumeInfo, resumeRef }) => {
  return (
    <div ref={resumeRef} className="shadow-lg h-full p-4 bg-white rounded-md font-serif text-gray-800" style={{ borderColor: resumeInfo?.themeColor }}>
      {/* Header Section */}
      <div className="text-center pb-2  border-gray-300">
        <h1 className="text-3xl font-bold" style={{ color: '#32CD32', fontFamily: 'Georgia, serif' }}>
          {resumeInfo?.firstName} {resumeInfo?.lastName}
        </h1>
        <hr className="border-t-2 border-gray-300 my-4" />
        <div className="flex justify-center items-center gap-6 text-sm text-gray-500">
          {resumeInfo?.address && (
            <p className="flex items-center gap-2">
              <MapPin size={16} /> {resumeInfo.address}
            </p>
          )}
          {resumeInfo?.phone && (
            <p className="flex items-center gap-2">
              <Phone size={16} /> {resumeInfo.phone}
            </p>
          )}
          {resumeInfo?.email && (
            <p className="flex items-center gap-2">
              <Mail size={16} /> {resumeInfo.email}
            </p>
          )}
        </div>
      </div>

      {/* Profile Summary */}
      {resumeInfo?.summery && (
        <div className="mb-8">
          <h2 className="text-lg font-bold border-b-2 pb-2 mb-4" style={{ color: '#32CD32', fontFamily: 'Georgia, serif' }}>Profile</h2>
          <p className="text-sm leading-relaxed text-gray-700" style={{ fontFamily: 'Georgia, serif' }}>{resumeInfo.summery}</p>
        </div>
      )}

      {/* Work Experience */}
      {resumeInfo?.experience?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold border-b-2 pb-2 mb-4" style={{ color: '#32CD32', fontFamily: 'Georgia, serif' }}>Experience</h2>
          {resumeInfo.experience.map((exp) => (
            <div key={exp.id} className="mb-6">
              <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
                <Briefcase size={16} /> {exp.title}
              </h3>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{exp.companyName}, {exp.city}, {exp.state}</span>
                <span>
                  {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
                </span>
              </div>
              <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
                {exp.workSummery?.split('\n').map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resumeInfo?.education?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold border-b-2 pb-2 mb-4" style={{ color: '#32CD32', fontFamily: 'Georgia, serif' }}>Education</h2>
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

      {/* Technical Skills */}
      {resumeInfo?.skills?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold border-b-2 pb-2 mb-4" style={{ color: '#32CD32', fontFamily: 'Georgia, serif' }}>Skills & Abilities</h2>
          <ul className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            {resumeInfo.skills.map((skill) => (
                <li key={skill.id} className="flex items-center">
                <span
                    className={`px-3 py-1 rounded-full text-sm ${
                    skill.level > 75 ? 'bg-green-500 text-white' : 'bg-gray-300'
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
