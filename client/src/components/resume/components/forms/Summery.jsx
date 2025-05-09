import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';

const Summery = () => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summery, setSummery] = useState(resumeInfo?.summery || '');

    useEffect(() => {
        if (summery !== resumeInfo?.summery) {
            setResumeInfo({
                ...resumeInfo,
                summery: summery,
            });
        }
    }, [summery, resumeInfo, setResumeInfo]);

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
            <h2 className="font-bold text-2xl">Summary</h2>
            <p className="text-gray-600 mt-2">Add a summary for your job title</p>

            <form className="mt-7">
                <textarea
                    className="mt-5 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    rows="10"
                    value={summery} // Controlled component, use value
                    onChange={(e) => setSummery(e.target.value)}
                />
            </form>
        </div>
    );
};

export default Summery;
