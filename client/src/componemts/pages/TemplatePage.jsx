import React from 'react';
import {useState,useEffect} from 'react';
import axios from "axios";


const TemplatePage = () => {

const [allTemplates,setallTemplates] =useState([]);
const [loading,setLoading] =useState(false);


const getAllTemplates =async()=>{
    try{
        setLoading(true);

const response = await axios.get("http://localhost:5000/templates/"); // API call
const ResoponseParsed= response.data;

setallTemplates(ResoponseParsed);

    }
    catch(err){
console.log("got error while fetching templates ",err);
    }
    finally{
        setLoading(false);

    }
}



useEffect(()=>{
    getAllTemplates();
},[]);


    return (
      <div className="p-8 min-h-screen bg-gray-100 dark:bg-gray-900">
        <h1 className="text-center text-3xl lg:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Choose a Template That Best Suits Your Style
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-300 mb-10">
          Browse through our variety of templates designed for every career stage. Select one to get started, and don't worry—you can change it at any time!
        </p>
  
        {/* Template Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allTemplates.map((template) => (
            <div
              key={template._id}
              className="bg-white dark:bg-gray-800 rounded-md shadow-lg p-4 relative transform transition-all duration-300 group hover:scale-105 hover:shadow-xl hover:bg-teal-100 dark:hover:bg-teal-800"
            >
              <div className="relative">
                <img
                  src={template.image}
                  alt={template.name}
                  className="rounded-md mb-4 h-64 object-cover"
                />
                {/* Hover button appears */}
                <button className="absolute bottom-4 left-0 right-0 mx-auto bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 rounded w-3/4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Use this template
                </button>
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
