import React from 'react';
import {useState,useEffect} from 'react';
import axios from "axios";


const templates = [
  { id: 1, name: 'Double Column', image: '/path-to-image1.png' },
  { id: 2, name: 'Ivy League', image: '/path-to-image2.png' },
  { id: 3, name: 'Elegant', image: '/path-to-image3.png' },
  { id: 4, name: 'Contemporary', image: '/path-to-image4.png' },
  { id: 5, name: 'Modern', image: '/path-to-image5.png' },
  { id: 6, name: 'Professional', image: '/path-to-image6.png' },
  { id: 7, name: 'Minimal', image: '/path-to-image7.png' },
  { id: 8, name: 'Creative', image: '/path-to-image8.png' },
  { id: 9, name: 'Classic', image: '/path-to-image9.png' },
  { id: 10, name: 'Stylish', image: '/path-to-image10.png' },
  { id: 11, name: 'Futuristic', image: '/path-to-image11.png' },
  { id: 12, name: 'Vintage', image: '/path-to-image12.png' },
  { id: 13, name: 'Corporate', image: '/path-to-image13.png' },
  { id: 14, name: 'Bold', image: '/path-to-image14.png' },
  { id: 15, name: 'Techy', image: '/path-to-image15.png' },
];
const TemplatePage = () => {

const [allTemplates,setallTemplates] =useState([]);

const getAllTemplates =async()=>{
    try{
const response = await axios.get("http://localhost:5000/template/"); // API call
console.log("all template -->> ",response);

    }
    catch(err){

    }
    finally{

    }
}



useEffect(()=>{

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
          {templates.map((template) => (
            <div
              key={template.id}
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
