import React, { useContext, useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';

function Skills() {
  const [skillsList, setSkillsList] = useState([
    {
      name: '',
      rating: 0
    }
  ]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // Initialize skills list from resumeInfo
  useEffect(() => {
    resumeInfo && setSkillsList(resumeInfo?.skills);
  }, []);

  // Handle input changes
  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  // Add a new skill entry
  const AddNewSkills = () => {
    setSkillsList([
      ...skillsList,
      {
        name: '',
        rating: 0
      }
    ]);
  };

  // Remove the last skill entry
  const RemoveSkills = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };

  // Sync skillsList with resumeInfo
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList
    });
  }, [skillsList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-primary mt-10 bg-white">
      <h2 className="font-bold text-2xl text-gray-800">Skills</h2>
      <p className="text-sm text-gray-600 my-2">Add your top professional key skills</p>

      <div>
        {skillsList.map((item, index) => (
          <div key={index} className="mt-2 flex justify-between items-center mb-2 border rounded-lg p-3 bg-gray-50">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 ml-1 mb-1">Name</label>
              <input
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                defaultValue={item.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
              />
            </div>
            <div className="ml-3">
              <Rating
                style={{ maxWidth: 120 }}
                value={item.rating}
                onChange={(v) => handleChange(index, 'rating', v)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-5">
        <div className="flex gap-2">
          <button
            onClick={AddNewSkills}
            className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-primary-dark"
          >
            + Add More Skill
          </button>
          <button
            onClick={RemoveSkills}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
          >
            - Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default Skills;
