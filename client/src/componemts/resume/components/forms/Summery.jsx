import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Summery = ({ enabledNext }) => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [summery, setSummery] = useState()
    const params = useParams()

    useEffect(() => {
        if (summery) {
            setResumeInfo({
                ...resumeInfo,
                summery: summery,
            })
        }
    }, [summery])

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
            <h2 className="font-bold text-lg">Summary</h2>
            <p>Add a summary for your job title</p>

            <form className="mt-7">
                <textarea
                    className="mt-5 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    rows="10"
                    value={summery}
                    defaultValue={summery || resumeInfo?.summery}
                    onChange={(e) => setSummery(e.target.value)}
                />
            </form>
        </div>
    )
}

export default Summery
