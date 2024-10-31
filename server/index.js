// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectToDB=require('./config/db')

const userRoutes = require('./routes/userRoutes');
// const resumeRoutes = require('./routes/');
const templateRoutes = require('./routes/templateRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const cors = require('cors');

dotenv.config();
connectToDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));



// Route middleware
app.use('/users', userRoutes);
// app.use('/resumes', resumeRoutes);
app.use('/templates', templateRoutes);
app.use('/feedback', feedbackRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ---> ${PORT}`);
});
