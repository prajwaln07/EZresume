const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
           type: String,
           required: true,
           trim:true
         },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim:true
     },
    password: 
    { type: String,
     required: true 
    },
    role: {
         type: String, 
          enum: ['user', 'admin'],
          default: 'user' 
        },
    resumes: [
        {
             type: mongoose.Schema.Types.ObjectId,
              ref: 'Resume'
             }
    ],
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    profileImage: {
         type: String 
        }, // URL of the user's profile image
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
