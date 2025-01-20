import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, unsetLoading } from "../../redux/actions/loadingSetter";
import { setTemplateID, changeTemplate, fetchTemplatesSuccess, fetchTemplatesFailure } from "../../redux/actions/templateDetails";
import apiConfig from "../../api/apiConfig";
import Chatbot from '../ChatbotWithChat';

const TemplatePage = () => {
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDescription, setModalDescription] = useState("");

  const [category, setCategory] = useState("");
  const [customizable, setCustomizable] = useState("");
  const [downloadsRange, setDownloadsRange] = useState("");

  const [facets, setFacets] = useState({
    categories: [],
    customizable: [],
    downloadsRanges: []
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const templates = useSelector((state) => state.template.templates);

  // Fetch templates with filters from the backend
  const getAllTemplates = async () => {
    try {
      dispatch(setLoading());
      const params = {
        category,
        customizable: customizable === "" ? undefined : customizable,
        downloadsRange
      };
      const response = await axios.get(apiConfig.templates.getAll, { params });
      dispatch(fetchTemplatesSuccess(response.data.templates));
      setFacets(response.data.facets); // Update facets with data from the backend
    } catch (err) {
      dispatch(fetchTemplatesFailure(err.message));
      console.error("Error while fetching templates", err);
    } finally {
      setLoadingTemplates(false);
      dispatch(unsetLoading());
    }
  };

  useEffect(() => {
    getAllTemplates();
  }, [category, customizable, downloadsRange]); // Re-fetch when any filter changes

  const handleTemplateClick = (name, templateId) => {
    dispatch(changeTemplate(name));
    dispatch(setTemplateID(templateId));
    navigate(`/resume/maker`);
  };

  const openModal = (description) => {
    setModalDescription(description);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalDescription("");
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-center text-3xl lg:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Choose a Template That Best Suits Your Style
      </h1>
      <p className="text-center text-gray-500 dark:text-gray-300 mb-10">
        Browse through our variety of templates. Select one to get started!
      </p>

      {/* Enhanced Filters */}
      <div className="mb-8 flex flex-wrap justify-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        {/* Category Filter */}
        <div className="flex flex-col items-start">
          <label htmlFor="category" className="text-gray-700 dark:text-gray-300 font-medium mb-2">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <option value="">All Categories</option>
            {facets.categories.map((facet) => (
              <option key={facet._id} value={facet._id}>
                {facet._id} ({facet.count})
              </option>
            ))}
          </select>
        </div>

        {/* Customizable Filter */}
        <div className="flex flex-col items-start">
          <label htmlFor="customizable" className="text-gray-700 dark:text-gray-300 font-medium mb-2">
            Customizability
          </label>
          <select
            id="customizable"
            value={customizable}
            onChange={(e) => setCustomizable(e.target.value === "true" ? true : e.target.value === "false" ? false : "")}
            className="p-3 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <option value="">All Templates</option>
            <option value="true">Customizable</option>
            <option value="false">Non-customizable</option>
          </select>
        </div>

        {/* Downloads Range Filter */}
        <div className="flex flex-col items-start">
          <label htmlFor="downloadsRange" className="text-gray-700 dark:text-gray-300 font-medium mb-2">
            Downloads Range
          </label>
          <select
            id="downloadsRange"
            value={downloadsRange}
            onChange={(e) => setDownloadsRange(e.target.value)}
            className="p-3 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <option value="">All Downloads</option>
            {facets.downloadsRanges.map((range) => (
              <option key={range._id} value={range._id}>
                {range.label} ({range.count})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Template Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loadingTemplates
          ? Array(8) // Placeholder for skeleton loading
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-300 dark:bg-gray-700 rounded-md shadow-md p-4 h-80 animate-pulse"
                >
                  <div className="bg-gray-400 dark:bg-gray-600 rounded-md h-48 mb-4"></div>
                  <div className="bg-gray-400 dark:bg-gray-600 h-6 w-3/4 mx-auto rounded mb-2"></div>
                  <div className="bg-gray-400 dark:bg-gray-600 h-6 w-1/2 mx-auto rounded"></div>
                </div>
              ))
          : templates.map((template) => (
              <div
              onClick={() =>
                handleTemplateClick(
                  template.layout,
                  template._id,
                )
              }
                key={template._id}
                className="bg-gray-200 dark:bg-gray-800 rounded-md shadow-lg p-4 relative transform transition-all duration-300 group hover:scale-105 hover:shadow-xl hover:bg-teal-100 dark:hover:bg-teal-800 hover:cursor-pointer"
              >
                <div className="relative flex items-center justify-center">
                  <FaInfoCircle
                    onClick={() => openModal(template.description)}
                    className="size-6 absolute -right-2 -top-2 text-blue-500 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-300"
                  />
                  <img
                    src={template.image}
                    alt={template.name}
                    className="rounded-md mb-4 h-64 object-cover"
                  />
                  {!template.isCustomizable ? (
                    <button
                      onClick={() =>
                        handleTemplateClick(
                          template.layout,
                          template._id,
                        )
                      }
                      className="absolute bottom-4 left-0 right-0 mx-auto bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 rounded w-3/4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      Use this template
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleTemplateClick(
                          template.layout,
                          template._id,
                        )
                      }
                      className=" absolute bottom-4 left-0 right-0 mx-auto bg-yellow-300 hover:bg-yellow-400 text-white font-bold py-2 rounded w-3/4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      Customizable Template
                    </button>
                  )}
                </div>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 text-center">
                  {template.name}
                </h2>
              </div>
            ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-3/4 md:w-1/2 lg:w-1/3 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
              Template Description
            </h3>
            {modalDescription.split(".").map((point, index) => (
              point.trim() && (
                <div key={index} className="text-gray-600 dark:text-gray-400">
                  <div>
                    <p className="inline font-semibold">{index + 1}</p>
                    {". " + point.trim()}
                  </div>
                  <div className="h-2 block"></div>
                </div>
              )
            ))}
            <button
              onClick={closeModal}
              className="mt-4 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <Chatbot></Chatbot>

    </div>
  );
};

export default TemplatePage;
