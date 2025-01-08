import React from 'react';
import Modal from './Modal';
import { motion } from 'framer-motion';

const CreateTemplateModal = ({
  formData,
  onClose,
  onInputChange,
  onFileChange,
  onSubmit,
  isLoading,
}) => {
  const categoriesOptions = [
    'single-column',
    'double-column',
    'minimal',
    'creative',
    'professional',
  ];

  const handleCategoriesChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    onInputChange({ target: { name: 'categories', value: options } });
  };

  return (
    <Modal onClose={onClose}>
      <motion.div
        className="max-w-4xl w-full p-8 bg-white rounded-3xl shadow-2xl border-2"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-4">Create New Template</h2>
        <p className="text-center text-gray-600 mb-6">Fill out the details to create a new template.</p>

        <form onSubmit={onSubmit} className="grid grid-cols-5 gap-6">
          <div className="form-group col-span-2">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-700"
              placeholder="Enter template name"
              required
            />
          </div>

          <div className="form-group col-span-2">
            <label className="block text-sm font-medium text-gray-700">Layout</label>
            <input
              name="layout"
              value={formData.layout}
              onChange={onInputChange}
              className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-700"
              rows="3"
              placeholder="Enter template layout"
              required
            ></input>
          </div>

          <div className="form-group col-span-1">
            <label className="block text-sm font-medium text-gray-700">Is Customizable</label>
            <div className="flex items-center space-x-6 mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isCustomizable"
                  value={true}
                  checked={formData.isCustomizable === true}
                  onChange={(e) => onInputChange({ target: { name: 'isCustomizable', value: true } })}
                  className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isCustomizable"
                  value={false}
                  checked={formData.isCustomizable === false}
                  onChange={(e) => onInputChange({ target: { name: 'isCustomizable', value: false } })}
                  className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">No</span>
              </label>
            </div>
          </div>

          <div className="form-group col-span-3">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onInputChange}
              className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-700"
              rows="4"
              placeholder="Enter template description"
              required
            ></textarea>
          </div>

    

          <div className="form-group col-span-2">
            <label className="block text-sm font-medium text-gray-700">Categories</label>
            <select
              name="categories"
              value={formData.categories}
              onChange={handleCategoriesChange}
              multiple
              className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-700"
              required
            >
              {categoriesOptions.map((category) => (
                <option key={category} value={category} className="text-gray-700">
                  {category}
                </option>
              ))}
            </select>
            <p className="text-gray-500 text-sm mt-2">
              Hold down the Ctrl (Windows) or Command (Mac) key to select multiple options.
            </p>
          </div>

          <div className="form-group col-span-5">
            <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
            <input
              type="file"
              name="thumbnail"
              onChange={onFileChange}
              className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
              accept="image/*"
              required
            />
          </div>

     

          <div className="col-span-4 flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-6 bg-gray-300 text-gray-700 font-semibold rounded-xl shadow-lg hover:bg-gray-400 focus:ring-4 focus:ring-gray-200"
            >
              Cancel
            </button>
            <motion.button
              type="submit"
              className="py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:from-purple-500 hover:to-blue-500 focus:ring-4 focus:ring-blue-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {isLoading ? 'Creating...' : 'Create Template'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </Modal>
  );
};

export default CreateTemplateModal;
