import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';

function Skills() {
  const [skillsList, setSkillsList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // Initialize skills list from resumeInfo only once
  useEffect(() => {
    if (resumeInfo?.skills && skillsList.length === 0) {
      setSkillsList(resumeInfo.skills);
    }
  }, [resumeInfo]);

  // Handle input changes
  const handleChange = (index, name, value) => {
    const newEntries = [...skillsList];
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  // Add a new skill entry
  const AddNewSkills = () => {
    setSkillsList([...skillsList, { name: '', rating: 0 }]);
  };

  // Remove a specific skill by index
  const removeSkillAtIndex = (index) => {
    setSkillsList((skillsList) => skillsList.filter((_, i) => i !== index));
  };

  // Sync skillsList with resumeInfo without causing re-renders
  useEffect(() => {
    if (
      resumeInfo?.skills &&
      JSON.stringify(resumeInfo.skills) !== JSON.stringify(skillsList)
    ) {
      setResumeInfo((prev) => ({
        ...prev,
        skills: skillsList,
      }));
    }
  }, [skillsList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-primary mt-10 bg-white">
      <h2 className="font-bold text-2xl text-gray-800">Skills</h2>
      <p className="text-sm text-gray-600 my-2">Add your  professional  skills</p>

      <div>
        {skillsList.map((item, index) => (
          <div key={index} className="mt-2 flex justify-between items-center mb-2 border rounded-lg p-3 bg-gray-50">
            <div className="flex-1 mr-4">
              <label className="block text-xs font-medium text-gray-700 ml-1 mb-1">Name</label>
              <input
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                value={item.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
              />
            </div>
            <button
              className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
              onClick={() => removeSkillAtIndex(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-5">
        <button
          onClick={AddNewSkills}
          className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-primary-dark"
        >
          + Add More Skill
        </button>
      </div>
      
    </div>
  );
}

export default Skills;
