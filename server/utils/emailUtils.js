// HTML email for the user confirmation
const transporter = require('../config/emailService');

const userConfirmationHTML = (message) => `
  <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <h2 style="color: #4CAF50;">Thank You for Contacting Us!</h2>
    <p>Dear User,</p>
    <p>We appreciate you reaching out. We have received your query as follows:</p>
    <blockquote style="border-left: 4px solid #4CAF50; padding-left: 10px; color: #555;">${message}</blockquote>
    <p>Our team will review your query and get back to you at the earliest opportunity.</p>
    <p>In the meantime, feel free to explore our <a href="https://ezresume.onrender.com" style="color: #4CAF50; text-decoration: none;"> Website </a> for more information.</p>
    <p>Best regards,</p>
    <p><strong>The EZResume Team</strong></p>
    <hr style="border: 0; border-top: 1px solid #ddd;" />
    <p style="font-size: 12px; color: #999;">This is an automated email. Please do not reply.</p>
  </div>
`;

// Plain text version for the user confirmation
const userConfirmationText = (message) => `
  Dear User,

  Thank you for reaching out. We have received your query:
  "${message}"

  Our team will get back to you as soon as possible.

  Best regards,
  The EZResume Team
`;

// HTML email for admin notification
const adminNotificationHTML = (email, subject, message) => `
  <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <h2 style="color: #FF5722;">New Contact Us Query Received</h2>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <blockquote style="border-left: 4px solid #FF5722; padding-left: 10px; color: #555;">${message}</blockquote>
    <p>Check the admin dashboard for more details.</p>
    <hr style="border: 0; border-top: 1px solid #ddd;" />
    <p style="font-size: 12px; color: #999;">This is an automated email notification from the EZResume platform.</p>
  </div>
`;

// Plain text version for admin notification
const adminNotificationText = (email, subject, message) => `
  New query received:
  Email: ${email}
  Subject: ${subject}
  Message: ${message}

  Check the admin dashboard for more details.
`;


const sendEmail = async (to, subject, text, html) => {
    try {
      // Validate input data before attempting to send the email
      if (!to || !subject || (!text && !html)) {
        throw new Error("Missing required fields (to, subject, text/html)");
      }
  
      const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to, // Receiver address
        subject, // Subject line
        text, // Plain text body
        html, // HTML body (optional)
      };
  
      // Sending the email
      const info = await transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      console.error('Error sending email:', error); // Log detailed error
      throw error; // Rethrow to handle it in the route
    }
  };

module.exports = { 
  userConfirmationHTML, 
  userConfirmationText, 
  adminNotificationHTML, 
  adminNotificationText,
  sendEmail,
};

  