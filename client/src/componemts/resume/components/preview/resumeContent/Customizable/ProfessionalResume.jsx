import React, { useState, useEffect } from "react";
import { Linkedin, Github, Globe, Briefcase } from "lucide-react";
import cleanUrl from "../../utils";

const GradTemplate = ({ resumeInfo, resumeRef }) => {
  const [draggingSection, setDraggingSection] = useState(null);
  const [positions, setPositions] = useState({});
  const [offset, setOffset] = useState({ y: 0 });
  const [sectionsOrder, setSectionsOrder] = useState([
    "summary",
    "education",
    "work-experience",
    "projects",
    "skills",
  ]);

  const handleMouseDown = (e, section) => {
    setDraggingSection(section);
    setOffset({
      y: e.clientY - (positions[section]?.y || 0),
    });
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (draggingSection) {
      const newPosY = e.clientY - offset.y;

      // Update position of the dragged section
      setPositions((prevPositions) => ({
        ...prevPositions,
        [draggingSection]: { y: newPosY },
      }));
    }
  };

  const handleMouseUp = () => {
    setDraggingSection(null);
  };

  useEffect(() => {
    if (draggingSection) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggingSection]);

  const renderDraggableSection = (section, title, content, index) => {
    const currentPosition = positions[section] || { y: 0 };
    return (
      <div
        key={index}
        className="mb-6"
        onMouseDown={(e) => handleMouseDown(e, section)}
        style={{
          position: "relative",
          cursor: "move",
          top: `${currentPosition.y}px`,
        }}
      >
        <h2 className="text-lg font-bold">{title}</h2>
        <hr className="my-2 border-gray-300" />
        {content}
      </div>
    );
  };

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
        <div className="text-sm mt-2 text-gray-600 flex justify-start gap-6">
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

      {/* Render Sections */}
      {sectionsOrder.map((section, index) => {
        const sectionContent = {
          summary: resumeInfo?.summery && (
            <p className="text-sm leading-relaxed text-gray-700">{resumeInfo.summery}</p>
          ),
          education: resumeInfo?.education?.length > 0 && (
            <>
              {resumeInfo.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <p className="font-semibold flex justify-between">
                    <span>{edu.universityName} | {edu.degree}</span>
                    <span className="text-sm text-gray-600">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">Major: {edu.major}</p>
                  {edu.description && (
                    <p className="text-sm mt-2 text-gray-600">{edu.description}</p>
                  )}
                </div>
              ))}
            </>
          ),
          "work-experience": resumeInfo?.experience?.length > 0 && (
            <>
              {resumeInfo.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-1">
                    <Briefcase size={16} /> {exp?.title}
                  </h3>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{exp?.companyName}</span>
                    <span>
                      {exp?.startDate} - {exp?.currentlyWorking ? "Present" : exp?.endDate}
                    </span>
                  </div>
                  <div
                    className="text-sm text-gray-700 mt-2 [&>ul]:list-disc [&>ul]:pl-5 [&>li]:mb-1"
                    dangerouslySetInnerHTML={{ __html: exp?.workSummery || "" }}
                  />
                </div>
              ))}
            </>
          ),
          projects: resumeInfo?.projects?.length > 0 && (
            <>
              {resumeInfo.projects.map((project, index) => (
                <div key={index} className="mb-6">
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
                          <Globe size={14} />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={cleanUrl(project.github)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 flex items-center gap-1"
                        >
                          <Github size={14} />
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
            </>
          ),
          skills: resumeInfo?.skills?.length > 0 && (
            <ul className="list-disc pl-5 text-sm text-gray-600 grid grid-cols-2">
              {resumeInfo.skills.map((skill, index) => (
                <li key={index} className="break-words col-span-1">
                  {skill.name}
                </li>
              ))}
            </ul>
          ),
        };

        return sectionContent[section] ? renderDraggableSection(section, section, sectionContent[section], index) : null;
      })}
    </div>
  );
};

export default GradTemplate;
