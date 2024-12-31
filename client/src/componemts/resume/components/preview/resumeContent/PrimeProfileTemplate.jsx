import React from "react";

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
        </div>

        {/* Summary Section */}
        {resumeInfo?.summery && (
          <div className="mb-6">
            <p className="text-sm">{resumeInfo.summery}</p>
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
            {resumeInfo.experience.map((exp,index) => (
              <div key={index} className="mb-4">
                <p className="text-md font-bold">{exp.title}</p>
                <p className="text-sm">
                  {exp.companyName} | {exp.city}, {exp.state} |{" "}
                  {exp.startDate} -{" "}
                  {exp.currentlyWorking ? "Present" : exp.endDate}
                </p>
                <p className="text-sm mt-2">{exp.workSummery}</p>
              </div>
            ))}
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
