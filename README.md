# EZResume

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fezresume.onrender.com)](https://ezresume.onrender.com)
[![GitHub stars](https://img.shields.io/github/stars/prajwaln07/resume-builder?style=social)](https://github.com/prajwaln07/resume-builder/stargazers)
[![GitHub license](https://img.shields.io/github/license/prajwaln07/resume-builder)](https://github.com/prajwaln07/resume-builder/blob/main/LICENSE)

EZResume is a user-friendly and feature-rich resume builder that empowers users to create professional resumes effortlessly. With a variety of templates, advanced UI/UX features, and AI-powered enhancements, EZResume is the ultimate tool for job seekers.

### 🌐 Live Demo
Explore the application here: [EZResume](https://ezresume.onrender.com/)

---

## 📋 Features

### 🔑 Authentication
- **JWT-based Authentication**: Secure login and registration.
- **Guest Users**: Create and download resumes without signing in.

### 🎨 Templates
- Variety of customizable templates.
- Add personal details, work experience, education, and more.

### 🖥️ Frontend Features
- Dark Mode Toggle (except `/resume/maker` route, enforced light mode).
- Interactive Animations and Parallax Scrolling.

### 🤖 AI Integration
- AI chatbot for resume-related queries.

### 💾 Backend Features
- **MERN Stack**: MongoDB, Express, React, Node.js.
- Fully tested backend routes using Postman.

---

## 🚀 Technologies Used

### 💻 Frontend
- **React** for the UI.
- **Redux** for state management.
- **CSS** for styling with advanced animations.

### 🛠️ Backend
- **Node.js** and **Express** for the server.
- **MongoDB** for the database.
- **JWT** for secure authentication.




---

## 🔧 Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/prajwaln07/resume-builder.git
   cd resume-builder

# For the server
cd server
npm install

# For the frontend
cd ../client
npm install


# Create a .env file in the server/ directory.

* Add the following:

* MONGO_URI=your_mongo_connection_string
* JWT_SECRET=your_jwt_secret
* CLOUDINARY_NAME=your_cloudinary_name
* CLOUDINARY_API_KEY=your_cloudinary_api_key
* CLOUDINARY_API_SECRET=your_cloudinary_api_secret


# Start the server
cd server
npm start

# Start the frontend
cd ../client
npm start

