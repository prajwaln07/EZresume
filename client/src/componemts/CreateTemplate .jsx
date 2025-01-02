import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateTemplate = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    layout: '',
    structure: '',
    premiumTemplate: false,
  });

  const [thumbnail, setThumbnail] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('layout', formData.layout);
    formDataToSend.append('structure', formData.structure);
    formDataToSend.append('premiumTemplate', formData.premiumTemplate);
    formDataToSend.append('thumbnail', thumbnail);

    try {
      const response = await axios.post('/api/v1/templates', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success('Template created successfully!');
        setFormData({
          name: '',
          description: '',
          layout: '',
          structure: '',
          premiumTemplate: false,
        });
        setThumbnail(null);
      } else {
        toast.error('Error creating template');
      }
    } catch (err) {
      toast.error('Error creating template');
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create Template</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Template Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="layout" className="block mb-2">Layout</label>
          <input
            type="text"
            id="layout"
            name="layout"
            value={formData.layout}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="structure" className="block mb-2">Structure</label>
          <input
            type="text"
            id="structure"
            name="structure"
            value={formData.structure}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="premiumTemplate" className="block mb-2">Premium Template</label>
          <input
            type="checkbox"
            id="premiumTemplate"
            name="premiumTemplate"
            checked={formData.premiumTemplate}
            onChange={() => setFormData({ ...formData, premiumTemplate: !formData.premiumTemplate })}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="thumbnail" className="block mb-2">Thumbnail</label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            onChange={handleFileChange}
            className="border p-2"
            required
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Create Template</button>
      </form>
    </div>
  );
};

export default CreateTemplate;
