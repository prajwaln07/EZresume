const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {uploadUserProfileImage} =require('../config/cloudinary');
const { sendEmail,userConfirmationHTML, userConfirmationText, adminNotificationHTML, adminNotificationText } = require('../utils/emailUtils');


const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if(!username || !email || !password){
      return res.status(400).json({
        success:false,
        message:"all fields are required."
      })
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success:false,
        message: 'Email already in use.'
       });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
       success:true, 
       message: 'User registered successfully.',
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
};



// User Login Function
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const trimmedEmail = email?.trim();
    const trimmedPassword = password?.trim();

    if(!trimmedEmail || !trimmedPassword){
       return res.status(400).json({
        success:false,
        message:"all fields are required."
      })
    }


    const user = await User.findOne({ email:trimmedEmail });

    if (!user) {
      return res.status(401).json({ 
         message: 'Invalid credentials.' 
        });
    }
                  
    const isMatch = await bcrypt.compare(trimmedPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ 
        message: 'Invalid credentials.'
       });
    }
    
    const token = jwt.sign(
       {
       userId: user._id,
        role: user.role
       }, 

      process.env.JWT_SECRET,

      {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
      }
  );   

    const { password: _, ...userData } = user.toObject();
    
     res.status(200)
    .cookie('token', token,  
      { 

        httpOnly: true, 
        sameSite: 'None',
        secure: true, 
        expires: new Date(Date.now() + (60 * 60 * 1000))
       }
      )
      .json({
       success:true,
       message: 'Login successful.',
       user: userData 
      });
       
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
};






// Delete User Account
const deleteUserAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.userId);
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found'
       });
    }
    res.status(200).json({ 
      message: 'User account deleted successfully'
     });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};



const logoutUser = async (req, res) => {
  try {

    res.cookie('token', '', { 
      httpOnly: true, 
      sameSite:'none',
      secure:true,
      expires: new Date(0)
    });

       res.status(200).json({
         success:true,
       message: 'Logout successful.'
       });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
};

// Get Count of Users
const getUserCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.status(200).json({
      success: true,
      userCount: userCount,
    });
  } catch (error) {
    console.error('Error fetching user count:', error);
       res.status(500).json({
       message: 'Internal server error. Please try again later.'
       });
  }
};




const contactUs = async (req, res) => {
  let { email, subject, message } = req.body;

    // Trim the inputs ,there might be a case where user have entered just spaces like "    " so to avoid it i have used .trim() method .
  email = email.trim();
  subject = subject.trim();
  message = message.trim();

  // Validate input
  if (!email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }



  try {
    // Send confirmation email to the user
    const userConfirmationSubject = "We’ve received your query!";
    const userConfirmationHTMLContent = userConfirmationHTML(message); // HTML content.....
    const userConfirmationTextContent = userConfirmationText(message); // Text content
    await sendEmail(email, userConfirmationSubject, userConfirmationTextContent, userConfirmationHTMLContent);

    // Send notification email to the admin........
    const adminNotificationSubject = "New Contact Us Query Received";
    const adminNotificationHTMLContent = adminNotificationHTML(email, subject, message); // HTML content
    const adminNotificationTextContent = adminNotificationText(email, subject, message); // Text content
    await sendEmail(process.env.EMAIL_USER, adminNotificationSubject, adminNotificationTextContent, adminNotificationHTMLContent);

    res.status(200).json({ success: true, message: 'Your query has been received and a confirmation email has been sent!' });
  } catch (error) {
    console.error('Error handling contact us form:', error);
    res.status(500).json({ success: false, message: 'Error processing your request', error });
  }
};


module.exports = {
  registerUser,
  loginUser,
  deleteUserAccount,
  getUserCount,
  logoutUser,
  contactUs,
};
