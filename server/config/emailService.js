const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465, 
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

// Verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error with email configuration:', error);
  } else {
    console.log('Email service is ready to send messages.');
  }
});

module.exports = transporter;
