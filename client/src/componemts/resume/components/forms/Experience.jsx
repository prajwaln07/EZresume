import React, { useContext, useState, useEffect } from 'react';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';

const formField = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummery: '',
  currentlyWorking: false, // Default value
};

function Experience() {
  const [experienceList, setExperienceList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    if (resumeInfo?.experience?.length > 0) {
      setExperienceList(resumeInfo.experience);
    }
  }, [resumeInfo]);

  const handleChange = (index, event) => {
    const { name, value, type } = event.target;
    const updatedList = [...experienceList];

    if (name === `currentlyWorking_${index}`) {
      updatedList[index].currentlyWorking = value === 'true'; // Convert string to boolean
      if (updatedList[index].currentlyWorking) {
        updatedList[index].endDate = ''; // Clear endDate if "currentlyWorking" is true
      }
    } else {
      updatedList[index][name] = type === 'checkbox' ? event.target.checked : value;
    }

    setExperienceList(updatedList);
  };

  const addNewExperience = () => {
    setExperienceList([...experienceList, { ...formField }]);
  };

  const removeExperience = () => {
    setExperienceList((list) => list.slice(0, -1));
  };

  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      experience: experienceList,
    }));
  }, [experienceList, setResumeInfo]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-2xl">Professional Experience</h2>
      <p className="text-gray-600 mt-2">Add Your Previous Job Experience</p>
      <div>
        {experienceList.map((item, index) => (
          <div key={index} className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
            {/* Position Title */}
            <div>
              <label className="text-xs">Position Title</label>
              <input
                name="title"
                className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(event) => handleChange(index, event)}
                value={item.title}
              />
            </div>
            {/* Company Name */}
            <div>
              <label className="text-xs">Company Name</label>
              <input
                name="companyName"
                className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(event) => handleChange(index, event)}
                value={item.companyName}
              />
            </div>
            {/* City */}
            <div>
              <label className="text-xs">City</label>
              <input
                name="city"
                className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(event) => handleChange(index, event)}
                value={item.city}
              />
            </div>
            {/* State */}
            <div>
              <label className="text-xs">State</label>
              <input
                name="state"
                className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(event) => handleChange(index, event)}
                value={item.state}
              />
            </div>
            {/* Currently Working */}
            <div className="col-span-2 w-8/12 flex gap-4 justify-start items-center">
              Currently Working
              <div className="flex justify-center items-center">
                <label className="text-xs">Yes</label>
                <input
                  type="radio"
                  name={`currentlyWorking_${index}`}
                  className="m-1"
                  value="true"
                  onChange={(event) => handleChange(index, event)}
                  checked={item.currentlyWorking === true}
                />
              </div>
              <div className="flex justify-center items-center">
                <label className="text-xs">No</label>
                <input
                  type="radio"
                  name={`currentlyWorking_${index}`}
                  className="m-1"
                  value="false"
                  onChange={(event) => handleChange(index, event)}
                  checked={item.currentlyWorking === false}
                />
              </div>
            </div>
            {/* Start Date */}
            <div>
              <label className="text-xs">Start Date</label>
              <input
                type="date"
                name="startDate"
                className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(event) => handleChange(index, event)}
                value={item.startDate}
              />
            </div>
            {/* End Date */}
            <div>
              <label className="text-xs">End Date</label>
              <input
                type="date"
                name="endDate"
                className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(event) => handleChange(index, event)}
                value={item.endDate}
                disabled={item.currentlyWorking}
              />
            </div>
            {/* Work Summary */}
            <div className="col-span-2">
              <label className="text-xs">Work Summary</label>
              <textarea
                name="workSummery"
                rows="6"
                className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(event) => handleChange(index, event)}
                value={item.workSummery}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex justify-between gap-2">
          <button
            onClick={addNewExperience}
            className="text-primary px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-primary-dark"
          >
            + Add More Experience
          </button>
          <button
            onClick={removeExperience}
            className="text-primary px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-primary-dark"
          >
            - Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
