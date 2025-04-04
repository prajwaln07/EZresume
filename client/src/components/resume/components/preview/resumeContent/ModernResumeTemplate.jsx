import React from 'react';
import { Mail, Phone, Briefcase, GraduationCap, CheckCircle,Linkedin,Github ,Globe ,Award  } from 'lucide-react';
import cleanUrl from '../utils';



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

{resumeInfo?.github && (
  <div className="flex items-center gap-1">
<Github size={16}></Github>
      <a       className="hover:text-primary"
 href={cleanUrl(resumeInfo.github)} target="_blank" rel="noopener noreferrer">GitHub</a>

  </div>
)}

{resumeInfo?.linkedin && (
  <div className="flex items-center gap-1">
    <Linkedin size={16}></Linkedin>
    <a
      href={cleanUrl(resumeInfo.linkedin)}  // Ensure this contains the correct URL without HTML tags
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
    <Globe size={16}></Globe>
    <a
      href={cleanUrl(resumeInfo.portfolio)}  // Ensure this contains the correct URL without HTML tags
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-primary"
    >
      PortFolio
    </a>
  </div>
)}


  </div>
</div>


      {/* Profile Summary */}
      {resumeInfo?.summery && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 border-b-2 pb-1 mb-2">Profile Summary</h2>
          <p className="text-gray-700 leading-relaxed text-sm">{resumeInfo.summery}</p>
        </div>
      )}

            {/* Education */}
            {resumeInfo?.education?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 border-b-2 pb-1 mb-2">Education</h2>
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

      {/* Work Experience */}
      {resumeInfo?.experience?.length > 0 && (
  <div className="mb-6">
    <h2 className="text-xl font-bold text-blue-600 border-b-2 pb-1 mb-2">Work Experience</h2>
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
        {/* Updated to render rich text content with lists */}
        <div
          className="text-sm text-gray-700 mt-2 [&>ul]:list-disc [&>ul]:pl-5 [&>li]:mb-1"
          dangerouslySetInnerHTML={{ __html: exp?.workSummery || '' }}
        ></div>

      </div>
    ))}
  </div>
)}


{/* Projects Section */}
{resumeInfo?.projects?.length > 0 && (
  <div className="mb-6">
    <h2 className="text-xl font-bold text-blue-600 border-b-2 pb-1 mb-2">Projects</h2>
    {resumeInfo.projects.map((project, index) => (
      <div key={index} className="mb-4">
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



      {/* Technical Skills */}
      {resumeInfo?.skills?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 border-b-2 pb-1 mb-2">Technical Skills</h2>
          <ul className="grid grid-cols-2 gap-2 text-sm text-gray-700">
            {resumeInfo.skills.map((skill, index) => (
              <li key={index} className="flex items-center gap-1">
                <CheckCircle size={16} /> {skill?.name}
              </li>
            ))}
          </ul>
        </div>
      )}

{/* Achievements Section */}
{resumeInfo?.achievements?.length > 0 && (
  <div className="mb-6">
    <h2 className="text-xl font-bold text-blue-600 border-b-2 pb-1 mb-2">Achievements</h2>
    <ul className="list-disc pl-5 text-gray-700 text-md">
      {resumeInfo.achievements.map((achievement) => (
        <li key={achievement.id} className="mb-2">
          <span className="font-semibold">{achievement.title}:</span> {achievement.description}
        </li>
      ))}
    </ul>
  </div>
)}


    </div>
  );
};

export default ModernResumeTemplate;
