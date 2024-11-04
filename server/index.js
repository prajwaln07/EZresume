// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectToDB=require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');

const {verifyToken}=require('./middleware/auth');

const userRoutes = require('./routes/userRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const templateRoutes = require('./routes/templateRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const versionRoutes=require('./routes/versionControlRoutes');



dotenv.config();
connectToDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
-
// Route middleware
app.use('/users', userRoutes);
app.use('/resumes', resumeRoutes);
app.use('/templates',verifyToken, templateRoutes);
app.use('/feedback',verifyToken, feedbackRoutes);
app.use('/resumes/:resumeId/versions', verifyToken, versionRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port -------> ${PORT}`);
});
app.get('/',(req,res)=>{
   res.send("running")
})
