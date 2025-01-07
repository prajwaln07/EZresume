import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  // Form validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    if (!formData.message) newErrors.message = 'Message is required';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
    //   const response = await axios.post('https://example.com/api/contact', formData);
      setSuccessMessage('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch (error) {
      setErrors({ form: 'Failed to send message. Please try again later.' });
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[655px] ">
      {/* Left side Image */}
      <div
        className="hidden lg:block w-2/5 bg-cover bg-center ml-1"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dkynwi65w/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1735334857/freepik__candid-image-photography-natural-textures-highly-r__24081_tp6bn6.jpg')`,
        }}
      ></div>

      {/* Right side Form */}
      <div className="flex-grow flex items-center justify-center px-4 md:px-8">
        <motion.div
          className="max-w-md w-full p-6 bg-white rounded-3xl shadow-2xl"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800">Contact Us</h2>
          <p className="text-center text-gray-600 mt-2">We would love to hear from you!</p>

          {errors.form && (
            <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg text-center">
              {errors.form}
            </div>
          )}
          {successMessage && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-center">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* Name */}
            <div className="form-group">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-700"
                placeholder="Enter your name"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-700"
                placeholder="Enter your email"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>

            {/* Message */}
            <div className="form-group">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-700"
                placeholder="Enter your message"
              ></textarea>
              {errors.message && <span className="text-red-500 text-sm">{errors.message}</span>}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full border-2 py-3 px-6 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-xl shadow-lg hover:from-green-500 hover:to-blue-500 focus:ring-4 focus:ring-blue-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
