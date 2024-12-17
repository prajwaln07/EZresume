import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ResumeEditor = () => {
  const { templateId } = useParams(); // Get the selected template ID
  const [template, setTemplate] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    skills: "",
  });

  // Fetch the selected template
  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/templates/${templateId}`);
        console.log("***** ----- *******",response);
        setTemplate(response.data);
      } catch (error) {
        console.error("Error fetching template:", error);
      }
    };

    fetchTemplate();
  }, [templateId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (!template) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
        Edit Your Resume: {template.name}
      </h1>

      {/* Editing Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-md shadow-lg">
        {/* Form Fields */}
        <div>
          <label className="block mb-2 text-gray-700">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <label className="block mt-4 mb-2 text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <label className="block mt-4 mb-2 text-gray-700">Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <label className="block mt-4 mb-2 text-gray-700">Education:</label>
          <textarea
            name="education"
            value={formData.education}
            onChange={handleChange}
            rows="2"
            className="w-full p-2 border rounded"
          />

          <label className="block mt-4 mb-2 text-gray-700">Experience:</label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            rows="2"
            className="w-full p-2 border rounded"
          />

          <label className="block mt-4 mb-2 text-gray-700">Skills:</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Live Preview */}
        <div className="bg-gray-50 p-4 rounded shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700">{formData.fullName || "Your Name"}</h2>
          <p className="text-gray-600">{formData.email || "Email"}</p>
          <p className="text-gray-600">{formData.phone || "Phone"}</p>

          <h3 className="mt-4 text-xl font-semibold text-gray-800">Education</h3>
          <p className="text-gray-600">{formData.education || "Your education details here..."}</p>

          <h3 className="mt-4 text-xl font-semibold text-gray-800">Experience</h3>
          <p className="text-gray-600">{formData.experience || "Your work experience here..."}</p>

          <h3 className="mt-4 text-xl font-semibold text-gray-800">Skills</h3>
          <p className="text-gray-600">{formData.skills || "Your skills here..."}</p>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;
