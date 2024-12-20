import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

let navigate =useNavigate();
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' }); // Clear individual field errors on change
  };

  // Form validation
  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

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
      const response = await axios.post('https://ezresume.onrender.com/api/v1/users/register', formData);
      setSuccessMessage(response.data.success);

      setFormData({ username: '', email: '', password: '' });
      setErrors({});
    } 
    catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors({ form: 'Please fix the errors and try again.' });
      } else if (error.response && error.response.data.message) {
        setErrors({ form: error.response.data.message });
      } else {
        setErrors({ form: 'Something went wrong. Please try again.' });
      }
    }
  };
  
  useEffect(()=>{

    if(successMessage)
navigate('/login');

  },[successMessage])

  
  return (
   <div className='h-screen'>
 <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800">Sign Up</h2>
      
      {errors.form && <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">{errors.form}</div>}
      
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Username */}
        <div className="form-group">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter username"
          />
          {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter email"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter password"
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Register
        </button>
      </form>
    </div>
   </div>
  );
};

export default SignupForm;
