
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectToDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const cronJob = require('./utils/cronJob'); 

const { verifyToken } = require('./middleware/auth');
const userRoutes = require('./routes/userRoutes');
const templateRoutes = require('./routes/templateRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const resumeRoutes = require('./routes/resumeRoutes'); 
const downloadRoutes = require('./routes/downloadRoutes'); 

// OpenAI integration
dotenv.config();
connectToDB();

const _dirname = path.resolve();
const corsOptions = {  
  origin: "https://ezresumecraft.netlify.app", // Frontend URL
  credentials: true, // Allow cookies and credentials
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allow cookies . . . . . .
};



const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

cronJob;

// Route middleware



app.use('/api/v1/users', userRoutes);
app.use('/api/v1/templates', templateRoutes);
app.use('/api/v1/feedback', feedbackRoutes);
app.use('/api/v1/downloads', downloadRoutes); 
app.use('/api/v1/resumes', resumeRoutes); 



// Start the server....
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('server is running on PORT ', PORT);
});
