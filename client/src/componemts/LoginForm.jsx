import React, {useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions/userDetail';
import { useNavigate } from 'react-router-dom';



const LoginForm = () => {
    let dispatch= useDispatch();
let navigate =useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  
  

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
      const response = await axios.post('http://localhost:5000/api/v1/users/login', formData);

      if(response.data.success){
        const { email, username, resumes, role } = response.data.user;
        dispatch(setUser({
            email,
            username,
            resumes, 
            role,
          }));
  navigate("/");
      }

      setSuccessMessage(response.data.success);
      setFormData({ email: '', password: '' });
      setErrors({});
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrors({ form: error.response.data.message });
      } else {
        setErrors({ form: 'Something went wrong. Please try again.' });
      }
    }
  };

  

  return (

   <div className='h-screen'>
 <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>
      {errors.form && <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">{errors.form}</div>}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
          Login
        </button>
      </form>
    </div>

   </div>
  );
};

export default LoginForm;
