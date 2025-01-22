import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions/userDetail';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import apiConfig from '../api/apiConfig';
import { Eye ,EyeClosed } from 'lucide-react';



const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

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
      const response = await axios.post(apiConfig.users.login, formData, {
        withCredentials: true,
      });

      if (response.data.success) {
        const { email, username, resumes, role } = response.data.user;
        const token = response.data.token;

        if (token) {
          localStorage.setItem('token', token);
        }

        dispatch(
          setUser({
            email,
            username,
            resumes,
            role,
          })
        );
        toast.success('User Login Successful!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        navigate('/');
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
    <div className="flex flex-col md:flex-row h-screen overflow-hidden ">
      {/* Left side Image */}
      <div
        className="ml-1 hidden lg:block w-2/5 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dkynwi65w/image/upload/v1735038010/freepik__candid-image-photography-natural-textures-highly-r__2462_dnxbpu.jpg')`,
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800">Welcome Back</h2>
          <p className="text-center text-gray-600 mt-2">Log in to access your account</p>

          {errors.form && (
            <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg text-center">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
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
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400 text-gray-700"
                placeholder="Enter your email"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>

   {/* Password */}
<div className="form-group relative">
  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
    Password
  </label>
  <input
    type={showPassword ? 'text' : 'password'}
    id="password"
    name="password"
    value={formData.password}
    onChange={handleChange}
    className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400 text-gray-700"
    placeholder="Enter your password"
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute top-1/2 mt-3 right-3 transform -translate-y-1/2 text-gray-500"
  >
    {showPassword ? <EyeClosed></EyeClosed> : <Eye></Eye>}
  </button>
  {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
</div>


            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full border-2 py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:from-pink-500 hover:to-purple-500 focus:ring-4 focus:ring-purple-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Log In
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginForm;
