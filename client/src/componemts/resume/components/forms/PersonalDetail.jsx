import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import React, { useContext} from 'react';

function PersonalDetail() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

   
    const handleInputChange = (e) => {
        const { name, value } = e.target;

       
        setResumeInfo({
            ...resumeInfo,
            [name]: value,
        });
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg border-t-4 border-t-primary mt-10">
            <h2 className="font-bold text-2xl  mb-2">Personal Details</h2>
            <p className="text-gray-600">Get started with your basic information.</p>

            <form className="mt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                        <label htmlFor='firstName' className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            defaultValue={resumeInfo?.firstName}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-primary focus:border-primary p-2"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label htmlFor='lastName'  className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            defaultValue={resumeInfo?.lastName}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm  p-2"
                        />
                    </div>

                    {/* Job Title */}
                    <div className="col-span-1 md:col-span-2">
                        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
                        <input
                            type="text"
                            name="jobTitle"
                            id="jobTitle"
                            defaultValue={resumeInfo?.jobTitle}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm  p-2"
                        />
                    </div>

                    {/* Address */}
                    <div className="col-span-1 md:col-span-2">
                        <label htmlFor='address' className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            defaultValue={resumeInfo?.address}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="phone"
                            name="phone"
                            defaultValue={resumeInfo?.phone}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-primary focus:border-primary p-2"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            defaultValue={resumeInfo?.email}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-primary focus:border-primary p-2"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PersonalDetail;
