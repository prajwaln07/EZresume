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
};

function Experience() {
  const [experinceList, setExperinceList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    if (resumeInfo?.experience?.length > 0) {
      setExperinceList(resumeInfo.experience);
    }
  }, [resumeInfo]);

  const handleChange = (index, event) => {
    const newEntries = [...experinceList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperinceList(newEntries);
  };

  const AddNewExperience = () => {
    setExperinceList([
      ...experinceList,
      { ...formField },
    ]);
  };

  const RemoveExperience = () => {
    setExperinceList((list) => list.slice(0, -1));
  };

  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      experience: experinceList,
    }));
  }, [experinceList, setResumeInfo]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-2xl ">Professional Experience</h2>
      <p className="text-gray-600 mt-2" >Add Your Previous Job Experience</p>
      <div>
        {experinceList.map((item, index) => (
          <div key={index} className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
            <div>
              <label className="text-xs">Position Title</label>
              <input
                name="title"
                className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(event) => handleChange(index, event)}
                value={item.title}
              />
            </div>
            <div>
              <label className="text-xs">Company Name</label>
              <input
                name="companyName"
                className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(event) => handleChange(index, event)}
                value={item.companyName}
              />
            </div>
            <div>
              <label className="text-xs">City</label>
              <input
                name="city"
                className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(event) => handleChange(index, event)}
                value={item.city}
              />
            </div>
            <div>
              <label className="text-xs">State</label>
              <input
                name="state"
                className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(event) => handleChange(index, event)}
                value={item.state}
              />
            </div>
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
            <div>
              <label className="text-xs">End Date</label>
              <input
                type="date"
                name="endDate"
                className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(event) => handleChange(index, event)}
                value={item.endDate}
              />
            </div>
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
            onClick={AddNewExperience}
            className="text-primary  px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-primary-dark "
          >
            + Add More Experience
          </button>
          <button
            onClick={RemoveExperience}
            className="text-primary  px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-primary-dark"
          >
            - Remove
          </button>
        </div>
      </div>

    </div>
  );
}

export default Experience;
