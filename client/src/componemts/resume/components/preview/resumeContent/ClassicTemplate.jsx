import React from 'react';

const ClassicTemplate = ({ resumeInfo ,resumeRef}) => {
  const formatWorkSummary = (summary) => {
    const lines = summary.split('\n');
    const bulletPointPattern = /^[\*\-\+]\s/;

    const htmlContent = lines.map((line) => {
      if (bulletPointPattern.test(line)) {
        return `<li>${line.replace(bulletPointPattern, '')}</li>`;
      } else {
        return `<p>${line}</p>`;
      }
    });

    return `<ul>${htmlContent.join('')}</ul>`;
  };

  return (
    <div ref={resumeRef} className="border-t-8 border-red-400 rounded-t-md p-5">
      {/* Personal Details */}
      <div className="mt-6">
        <h2
          className="font-bold text-xl text-center"
          style={{ color: resumeInfo?.themeColor }}
        >
          {resumeInfo?.firstName} {resumeInfo?.lastName}
        </h2>
        <h2 className="text-center text-sm font-medium">{resumeInfo?.jobTitle}</h2>
        <h2
          className="text-center font-normal text-xs"
          style={{ color: resumeInfo?.themeColor }}
        >
          {resumeInfo?.address}
        </h2>
        <div className="flex justify-between">
          <h2
            className="font-normal text-xs"
            style={{ color: resumeInfo?.themeColor }}
          >
            {resumeInfo?.phone}
          </h2>
          <h2
            className="font-normal text-xs"
            style={{ color: resumeInfo?.themeColor }}
          >
            {resumeInfo?.email}
          </h2>
        </div>
        <hr
          className="border-[1.5px] my-2"
          style={{ borderColor: resumeInfo?.themeColor }}
        />
      </div>

      {/* Summary */}
      {resumeInfo?.summery && (
        <p className="text-xs">{resumeInfo?.summery}</p>
      )}

      {/* Education */}
      {resumeInfo?.education?.length > 0 && (
        <div className="my-6">
          <h2
            className="text-center font-bold text-sm mb-2"
            style={{ color: resumeInfo?.themeColor }}
          >
            Education
          </h2>
          <hr style={{ borderColor: resumeInfo?.themeColor }} />
          {resumeInfo.education.map((education, index) => (
            <div key={index} className="my-5">
              <h2
                className="text-sm font-bold"
                style={{ color: resumeInfo?.themeColor }}
              >
                {education.universityName}
              </h2>
              <h2 className="text-xs flex justify-between">
                {education?.degree} in {education?.major}
                <span>
                  {education?.startDate} - {education?.endDate}
                </span>
              </h2>
              <p className="text-xs my-2">{education?.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Professional Experience */}
      {resumeInfo?.experience?.length > 0 && (
        <div className="my-6">
          <h2
            className="text-center font-bold text-sm mb-2"
            style={{ color: resumeInfo?.themeColor }}
          >
            Professional Experience
          </h2>
          <hr style={{ borderColor: resumeInfo?.themeColor }} />
          {resumeInfo.experience.map((experience, index) => (
            <div key={index} className="my-5">
              <h2
                className="text-sm font-bold"
                style={{ color: resumeInfo?.themeColor }}
              >
                {experience?.title}
              </h2>
              <h2 className="text-xs flex justify-between">
                {experience?.companyName}, {experience?.city}, {experience?.state}
                <span>
                  {experience?.startDate} To{' '}
                  {experience?.currentlyWorking ? 'Present' : experience.endDate}
                </span>
              </h2>
              <div
                className="text-xs my-2"
                dangerouslySetInnerHTML={{
                  __html: formatWorkSummary(experience?.workSummery),
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resumeInfo?.skills?.length > 0 && (
        <div className="my-6">
          <h2
            className="text-center font-bold text-sm mb-2"
            style={{ color: resumeInfo?.themeColor }}
          >
            Skills
          </h2>
          <hr style={{ borderColor: resumeInfo?.themeColor }} />
          <div className="grid grid-cols-2 gap-3 my-4">
            {resumeInfo.skills.map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <h2 className="text-xs">{skill.name}</h2>
                <div className="h-2 bg-gray-200 w-[120px]">
                  <div
                    className="h-2"
                    style={{
                      backgroundColor: resumeInfo?.themeColor,
                      width: skill?.rating * 20 + '%',
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassicTemplate;
