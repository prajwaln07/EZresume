import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import axios from "axios";
import { useSelector } from "react-redux";

const TemplateDetail = () => {
  const { templateId } = useParams();
  const [templateData, setTemplateData] = useState(null);
  const [formData, setFormData] = useState({}); 
  const isDarkmode = useSelector((state) => state.theme.isDarkmode);  // Get dark mode state

  let id = templateId;

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/templates/${id}`);
        const parsedStructure = JSON.parse(response.data.structure); 
        setTemplateData(parsedStructure);
        setFormData(parsedStructure); 
      } catch (error) {
        console.error("Error fetching template:", error);
      }
    };

    fetchTemplate();
  }, [id]);

  const handleInputChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  return (
    <div 
      style={{ 
        display: "flex", 
        gap: "20px", 
        backgroundColor: isDarkmode ? "#2c2c2c" : "#fff", 
        color: isDarkmode ? "#fff" : "#000" 
      }}
    >
      {/* Resume Preview */}
      <div 
        style={{ 
          flex: 2, 
          border: "1px solid #ddd", 
          padding: "20px", 
          backgroundColor: isDarkmode ? "#333" : "#fff", 
        }}
      >
        {templateData ? (
          <div>
            <h1>{formData.name}</h1>
            <h2>{formData.title}</h2>
            <div>
              <p>Email: {formData.contactInfo?.email}</p>
              <p>Phone: {formData.contactInfo?.phone}</p>
            </div>
            {formData.sections?.map((section, index) => (
              <div key={index}>
                <h3>{section.sectionTitle}</h3>
                {Array.isArray(section.content) ? (
                  <ul>
                    {section.content.map((item, i) => (
                      <div key={i}>
                        <li>{item.company}</li>
                        <li>{item.duration}</li>
                        <li>{item.jobTitle}</li>
                      </div>
                    ))}
                  </ul>
                ) : (
                  <p>{section.content}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Resume Editor */}
      <div 
        style={{ 
          flex: 1, 
          border: "1px solid #ddd", 
          padding: "20px", 
          backgroundColor: isDarkmode ? "#333" : "#fff", 
        }}
      >
        {templateData && (
          <div>
            <label>
              Name:
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) => handleInputChange("name", "value", e.target.value)}
              />
            </label>

            <label>
              Title:
              <input
                type="text"
                value={formData.title || ""}
                onChange={(e) => handleInputChange("title", "value", e.target.value)}
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                value={formData.contactInfo?.email || ""}
                onChange={(e) =>
                  handleInputChange("contactInfo", "email", e.target.value)
                }
              />
            </label>

            <label>
              Phone:
              <input
                type="text"
                value={formData.contactInfo?.phone || ""}
                onChange={(e) =>
                  handleInputChange("contactInfo", "phone", e.target.value)
                }
              />
            </label>

            <div>
              <h3>Skills</h3>
              {formData.sections?.map((section, index) =>
                section.sectionTitle === "Skills" ? (
                  <div key={index}>
                    {section.content.map((skill, i) => (
                      <input
                        key={i}
                        type="text"
                        value={skill}
                        onChange={(e) => {
                          const updatedSkills = [...section.content];
                          updatedSkills[i] = e.target.value;
                          handleInputChange("sections", index, updatedSkills);
                        }}
                      />
                    ))}
                  </div>
                ) : null
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateDetail;
