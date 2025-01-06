import Modal from './Modal';
const EditTemplateModal = ({
    formData,
    onClose,
    onInputChange,
    onFileChange,
    onSubmit,
    isLoading,
  }) => {
    return (
      <Modal
        title="Edit Template"
        onClose={onClose}
        footer={
          <>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg mr-2 hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={onSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </>
        }
      >
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={onInputChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description || ""}
              onChange={onInputChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
              required
            />
          </div>


          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Layout</label>
            <input
              type="text"
              name="layout"
              value={formData.layout || ""}
              onChange={onInputChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
              required
            />
          </div>


 

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Thumbnail</label>
            <input
              type="file"
              name="thumbnail"
              onChange={onFileChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
              accept="image/*"
            />
          </div>
        </form>
      </Modal>
    );
  };
  
  export default EditTemplateModal;
  