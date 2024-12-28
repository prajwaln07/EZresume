import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';

function Education() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [educationalList, setEducationalList] = useState([
    {
      universityName: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  ]);

  // Initialize educational list from resumeInfo
  useEffect(() => {
    resumeInfo && setEducationalList(resumeInfo?.education);
  }, []);

  // Handle changes in form inputs
  const handleChange = (event, index) => {
    const newEntries = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  // Add a new education entry
  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: '',
        degree: '',
        major: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ]);
  };

  // Remove the last education entry
  const RemoveEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
  };

  // Sync educationalList with resumeInfo
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList
    });
  }, [educationalList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-primary mt-10 bg-white">

      <h2 className="font-bold text-2xl text-gray-800">Education</h2>
      <p className="text-sm text-gray-600 mt-2">Add your educational details</p>

      <div>
        {educationalList.map((item, index) => (
          <div key={index} className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg bg-gray-50">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">University Name</label>
              <input
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                name="universityName"
                onChange={(e) => handleChange(e, index)}
                defaultValue={item?.universityName}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Degree</label>
              <input
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                name="degree"
                onChange={(e) => handleChange(e, index)}
                defaultValue={item?.degree}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Major</label>
              <input
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                name="major"
                onChange={(e) => handleChange(e, index)}
                defaultValue={item?.major}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                name="startDate"
                onChange={(e) => handleChange(e, index)}
                defaultValue={item?.startDate}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                name="endDate"
                onChange={(e) => handleChange(e, index)}
                defaultValue={item?.endDate}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                name="description"
                onChange={(e) => handleChange(e, index)}
                defaultValue={item?.description}
              />
            </div>
            
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-5">
        <div className="flex gap-2">
          <button
            onClick={AddNewEducation}
            className="px-4 py-2 text-sm font-medium text-white bg-green-400 rounded hover:bg-primary-dark"
          >
            + Add More Education
          </button>
          <button
            onClick={RemoveEducation}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
          >
            - Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default Education;
