import React, { useContext, useState, useEffect } from 'react';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill stylesheet

const formField = {
  name: '',
  description: '',
  technologies: [],
  link: '',
  github: '',
};

function Project() {
  const [projectList, setProjectList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    if (resumeInfo?.projects?.length > 0) {
      setProjectList(resumeInfo.projects);
    }
  }, [resumeInfo]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedList = [...projectList];
    updatedList[index][name] = value;
    setProjectList(updatedList);
  };

  const handleTechnologiesChange = (index, value) => {
    const updatedList = [...projectList];
    updatedList[index].technologies = value.split(',').map((tech) => tech.trim());
    setProjectList(updatedList);
  };

  const handleDescriptionChange = (index, value) => {
    const updatedList = [...projectList];
    updatedList[index].description = value;
    setProjectList(updatedList);
  };

  const addNewProject = () => {
    setProjectList([...projectList, { ...formField }]);
  };

  const removeProject = () => {
    setProjectList((list) => list.slice(0, -1));
  };

  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      projects: projectList,
    }));
  }, [projectList, setResumeInfo]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-2xl">Projects</h2>
      <p className="text-gray-600 mt-2">Add details about your projects</p>
      <div>
        {projectList.map((item, index) => (
          <div key={index} className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
            {/* Project Name */}
            <div className="col-span-2">
              <label className="text-xs">Project Name</label>
              <input
                name="name"
                className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(event) => handleChange(index, event)}
                value={item.name}
              />
            </div>
            {/* Description */}
            <div className="col-span-2">
              <label className="text-xs">Description</label>
              <ReactQuill
                value={item.description}
                onChange={(value) => handleDescriptionChange(index, value)}
                className="border border-gray-300 p-2 rounded-lg w-full"
                modules={{
                  toolbar: [
                    [{ 'list': 'bullet' }],
                    ['bold', 'italic', 'underline'],
                    ['link'],
                  ],
                }}
              />
            </div>
            {/* Technologies */}
            <div className="col-span-2">
              <label className="text-xs">Technologies (comma-separated)</label>
              <input
                name="technologies"
                className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(event) => handleTechnologiesChange(index, event.target.value)}
                value={item.technologies.join(', ')}
              />
            </div>
            {/* Link */}
            <div>
              <label className="text-xs">Project Link</label>
              <input
                name="link"
                type="url"
                className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(event) => handleChange(index, event)}
                value={item.link}
              />
            </div>
            {/* GitHub */}
            <div>
              <label className="text-xs">GitHub Repository</label>
              <input
                name="github"
                type="url"
                className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(event) => handleChange(index, event)}
                value={item.github}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex justify-between gap-2">
          <button
            onClick={addNewProject}
            className="text-primary px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-primary-dark"
          >
            + Add More Projects
          </button>
          <button
            onClick={removeProject}
            className="text-primary px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-primary-dark"
          >
            - Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default Project;
