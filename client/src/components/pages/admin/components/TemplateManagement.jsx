import React from "react";



const TemplateManagement = ({
  templates,
  handleDelete,
  setShowModal,
  setEditTemplateData,
  setIsEditing,
  expandedDescription,
  handleRestore,
  restoreLoading,
  setExpandedDescription,
}) => {


  return (
    <div className="mt-12 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Template Management
      </h3>
      <div className="hidden lg:block">
        {/* Table Layout for Larger Screens */}
        <table className="w-full table-auto border-collapse border border-gray-200 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border px-4 py-2 text-left text-gray-600 dark:text-gray-300">
                Name
              </th>
              <th className="border px-4 py-2 text-left text-gray-600 dark:text-gray-300">
                Description
              </th>
              <th className="border px-4 py-2 text-left text-gray-600 dark:text-gray-300">
                Created Date
              </th>
              <th className="border px-4 py-2 text-left text-gray-600 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {templates.map((template) => (
              <tr
                key={template._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="border px-4 py-2 text-gray-800 dark:text-gray-200">
                  {template.name}
                </td>
                <td className="border px-4 py-2 text-gray-800 dark:text-gray-200">
                  <div className="max-h-24 overflow-y-auto">
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
                      {expandedDescription === template._id
                        ? "Read Less"
                        : "Read More"}
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
    {template.deletedAt ? (
      // Show Restore button if deletedAt is not null (template is deleted)
      <button
        onClick={() => handleRestore(template._id)}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-400"
      >
        Restore
      </button>
    ) : (
      // Show Edit and Delete buttons if deletedAt is null (template is not deleted)
      <>
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
      </>
    )}
  </div>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="lg:hidden">

            {/* if screen is smalle i.e for resposiveness we will show temeplate vertically , so it will enhance UX */}
        {templates.map((template) => (
          <div
            key={template._id}
            className="border rounded-lg mb-4 p-4 bg-gray-50 dark:bg-gray-800"
          >
            <div className="mb-2">
              <strong className="text-gray-600 dark:text-gray-300">Name: </strong>
              <span className="text-gray-800 dark:text-gray-200">
                {template.name}
              </span>
            </div>
            <div className="mb-2">
              <strong className="text-gray-600 dark:text-gray-300">
                Description:{" "}
              </strong>
              <div className="max-h-24 overflow-y-auto">
                {expandedDescription === template._id ? (
                  <span>{template.description}</span>
                ) : (
                  <span>{template.description.substring(0, 100)}...</span>
                )}
              </div>
              {template.description.length > 100 && (
                <button
                  className="text-blue-500 dark:text-blue-300"
                  onClick={() =>
                    setExpandedDescription((prev) =>
                      prev === template._id ? null : template._id
                    )
                  }
                >
                  {expandedDescription === template._id ? "Read Less" : "Read More"}
                </button>
              )}
            </div>
            <div className="mb-2">
              <strong className="text-gray-600 dark:text-gray-300">
                Created Date:{" "}
              </strong>
              <span className="text-gray-800 dark:text-gray-200">
                {new Date(template.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
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
          </div>
        ))}
      </div>
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
