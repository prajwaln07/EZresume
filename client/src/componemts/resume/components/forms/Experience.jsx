import React, { useContext, useState, useEffect } from 'react';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';

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
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    resumeInfo?.experience.length > 0 && setExperinceList(resumeInfo?.experience);
  }, []);

  const handleChange = (index, event) => {
    const newEntries = experinceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperinceList(newEntries);
  };

  const AddNewExperience = () => {
    setExperinceList([
      ...experinceList,
      {
        title: '',
        companyName: '',
        city: '',
        state: '',
        startDate: '',
        endDate: '',
        workSummery: '',
      },
    ]);
  };

  const RemoveExperience = () => {
    setExperinceList((experinceList) => experinceList.slice(0, -1));
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      Experience: experinceList,
    });
  }, [experinceList]);

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        Experience: experinceList.map(({ id, ...rest }) => rest),
      },
    };

    // Call API here to save the data

    setLoading(false);
  };

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
          {experinceList.map((item, index) => (
            <div key={index}>
              <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                <div>
                  <label className='text-xs'>Position Title</label>
                  <input
                    name='title'
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.title}
                  />
                </div>
                <div>
                  <label className='text-xs'>Company Name</label>
                  <input
                    name='companyName'
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.companyName}
                  />
                </div>
                <div>
                  <label className='text-xs'>City</label>
                  <input
                    name='city'
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.city}
                  />
                </div>
                <div>
                  <label className='text-xs'>State</label>
                  <input
                    name='state'
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.state}
                  />
                </div>
                <div>
                  <label className='text-xs'>Start Date</label>
                  <input
                    type='date'
                    name='startDate'
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.startDate}
                  />
                </div>
                <div>
                  <label className='text-xs'>End Date</label>
                  <input
                    type='date'
                    name='endDate'
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.endDate}
                  />
                </div>
                <div className='col-span-2'>
                  <label className='text-xs'>Work Summary</label>
                  <textarea
                    name='workSummery'
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.workSummery}
                    rows='6'
                    className='w-full'
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <button onClick={AddNewExperience} className='text-primary'>
              + Add More Experience
            </button>
            <button onClick={RemoveExperience} className='text-primary'>
              - Remove
            </button>
          </div>
          <button disabled={loading} onClick={onSave}>
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
