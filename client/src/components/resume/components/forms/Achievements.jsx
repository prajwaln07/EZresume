import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Achievements() {
  const [achievementsList, setAchievementsList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // Initialize achievements list from resumeInfo only once
  useEffect(() => {
    if (resumeInfo?.achievements && achievementsList.length === 0) {
      setAchievementsList(resumeInfo.achievements);
    }
  }, [resumeInfo]);

  // Handle input changes
  const handleChange = (index, name, value) => {
    const newEntries = [...achievementsList];
    newEntries[index][name] = value;
    setAchievementsList(newEntries);
  };

  const handleDescriptionChange = (index, value) => {
    const newEntries = [...achievementsList];
    newEntries[index].description = value;
    setAchievementsList(newEntries);
  };

  // Add a new achievement entry
  const AddNewAchievement = () => {
    setAchievementsList([...achievementsList, { title: '', description: '' }]);
  };

  // Remove a specific achievement by index
  const removeAchievementAtIndex = (index) => {
    setAchievementsList((achievementsList) => achievementsList.filter((_, i) => i !== index));
  };

  // Sync achievementsList with resumeInfo without causing re-renders
  useEffect(() => {
    if (
      resumeInfo?.achievements &&
      JSON.stringify(resumeInfo.achievements) !== JSON.stringify(achievementsList)
    ) {
      setResumeInfo((prev) => ({
        ...prev,
        achievements: achievementsList,
      }));
    }
  }, [achievementsList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-primary mt-10 bg-white">
      <h2 className="font-bold text-2xl text-gray-800">Achievements</h2>
      <p className="text-sm text-gray-600 my-2">Add your achievements to showcase your highlights</p>

      <div>
        {achievementsList.map((item, index) => (
          <div key={index} className="mt-2 flex flex-col mb-2 border rounded-lg p-3 bg-gray-50">
            {/* Title */}
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-700 ml-1 mb-1">Title</label>
              <input
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                value={item.title}
                onChange={(e) => handleChange(index, 'title', e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-700 ml-1 mb-1">Description</label>
              <ReactQuill
                value={item.description}
                onChange={(value) => handleDescriptionChange(index, value)}
                className="border border-gray-300 rounded-lg w-full"
                modules={{
                  toolbar: [
                    ['italic', 'underline','bold'],
                    ['link'],
                  ],
                }}
                formats={['bold', 'italic', 'underline', 'list', 'link']}
              />
            </div>

            {/* Remove Button */}
            <div className='flex justify-start'>
            <button
              className="self-end px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
              onClick={() => removeAchievementAtIndex(index)}
            >
              Remove
            </button>
            </div>
     
          </div>
        ))}
      </div>

      {/* Add Achievement Button */}
      <div className="flex justify-between mt-5">
        <button
          onClick={AddNewAchievement}
          className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-primary-dark"
        >
          + Add Achievement
        </button>
      </div>
    </div>
  );
}

export default Achievements;
