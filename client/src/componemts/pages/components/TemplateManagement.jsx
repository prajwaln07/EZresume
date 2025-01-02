import React from "react";

const TemplateManagement = ({
  templates,
  handleDelete,
  setShowModal,
  setEditTemplateData,
  setIsEditing,
  expandedDescription,
  setExpandedDescription,
}) => {
  return (
    <div className="mt-12 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Template Management
      </h3>
      <table className="w-full table-auto border-collapse border border-gray-200 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="border px-4 py-2 text-left text-gray-600 dark:text-gray-300">Name</th>
            <th className="border px-4 py-2 text-left text-gray-600 dark:text-gray-300">Description</th>
            <th className="border px-4 py-2 text-left text-gray-600 dark:text-gray-300">Created Date</th>
            <th className="border px-4 py-2 text-left text-gray-600 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="border px-4 py-2 text-gray-800 dark:text-gray-200">{template.name}</td>
              <td className="border px-4 py-2 text-gray-800 dark:text-gray-200">
                <div className="max-h-24 overflow-y-auto min-w-[200px] max-w-[800px]">
                  {expandedDescription === template._id ? (
                    <span>{template.description}</span>
                  ) : (
                    <span>{template.description.substring(0, 100)}...</span>
                  )}
                </div>
                {template.description.length > 100 && (
                  <button
                    className="text-blue-500 dark:text-blue-300 ml-2"
                    onClick={() =>
                      setExpandedDescription((prev) =>
                        prev === template._id ? null : template._id
                      )
                    }
                  >
                    {expandedDescription === template._id ? "Read Less" : "Read More"}
                  </button>
                )}
              </td>
              <td className="border px-4 py-2 text-gray-800 dark:text-gray-200">
                {new Date(template.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                })}
              </td>          
              <td className="border px-4 py-2">
                <div className="flex space-x-2">
                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 dark:bg-blue-500 dark:hover:bg-blue-400"
                    onClick={() => {
                      setEditTemplateData(template);
                      setIsEditing(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(template._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 dark:bg-gray-500 dark:hover:bg-gray-400"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Create Button */}
      <div className="mt-6 flex justify-center">
        <button
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 dark:bg-teal-500 dark:hover:bg-teal-400"
          onClick={() => setShowModal(true)}
        >
          Create Template
        </button>
      </div>
    </div>
  );
};

export default TemplateManagement;
