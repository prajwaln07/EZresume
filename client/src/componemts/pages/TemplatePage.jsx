import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {setLoading} from '../../redux/actions/loadingSetter';
import {unsetLoading} from '../../redux/actions/loadingSetter';
import { AtomSpinner } from 'react-epic-spinners'


const TemplatePage = () => {
  const [allTemplates, setAllTemplates] = useState([]);
  // const [loading, setLoading] = useState(false);
  let loading =useSelector((state)=>state.loader.loading);
  const navigate = useNavigate(); // To navigate to other pages
  let dispatch =useDispatch();

  const getAllTemplates = async () => {
    try {
      dispatch(setLoading());
      const response = await axios.get("https://ezresume.onrender.com/api/v1/templates/");
      setAllTemplates(response.data);
    } catch (err) {
      console.log("Error while fetching templates ", err);
    } finally {
      dispatch(unsetLoading());
    }
  };

  useEffect(() => {
    getAllTemplates();
  }, []);

  const handleTemplateClick = (templateId,premiumTemplate) => {
if(premiumTemplate)
  navigate(`/pricing`);
    else
    navigate(`/resume/maker`); // Redirect to the editor page with the template ID
  };

  if(loading) return (
    <div className="flex justify-center items-center align-cneter h-screen ">
<AtomSpinner color="red" ></AtomSpinner>
    </div>
  )

  return (
    <div className="p-8 min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-center text-3xl lg:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Choose a Template That Best Suits Your Style
      </h1>
      <p className="text-center text-gray-500 dark:text-gray-300 mb-10">
        Browse through our variety of templates. Select one to get started!
      </p>

      {/* Template Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {allTemplates.map((template) => (
          <div
            key={template._id}
            className="bg-white dark:bg-gray-800 rounded-md shadow-lg p-4 relative transform transition-all duration-300 group hover:scale-105 hover:shadow-xl hover:bg-teal-100 dark:hover:bg-teal-800"
          >
            <div className="relative flex items-center justify-center">
              <img
                src={template.image}
                alt={template.name}
                className="rounded-md mb-4 h-64 object-cover"
              />
              {/* Hover button */}

{   !template.premiumTemplate ?           <button
                onClick={() => handleTemplateClick(template._id,template.premiumTemplate)} // Navigate on click

className="absolute bottom-4 left-0 right-0 mx-auto bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 rounded w-3/4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" >
 "Use this template"
</button>  :

<button
        onClick={() => handleTemplateClick(template._id,template.premiumTemplate)} // Navigate on click

className="absolute bottom-4 left-0 right-0 mx-auto bg-yellow-300 hover:bg-yellow-400 text-white font-bold py-2 rounded w-3/4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" >
 "Premium Required"
</button>
}
            </div>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 text-center">
              {template.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatePage;
