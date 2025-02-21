const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
   name: { 
      type: String, 
      required: true,
      maxLength: 100 
    },
    description: { 
      type: String,
      required: true,
      maxLength: 5500 
    },
    layout: {
      type: String,
      required: true 
    }, 
     isCustomizable: {
       type: Boolean,
       required: true,
       default: false 
      },

  categories: [
     { 
      type: String,
      enum: ['single-column', 'double-column', 'minimal', 'creative', 'professional']
     }
    ], 
  createdAt: {
      type: Date,
      default: Date.now
     },
  updatedAt: {
     type: Date,
     default: Date.now
     },
  deletedAt: {
     type: Date,
      default: null
     }, 
  image: { 
    type: String, 
    required: true
   }, 
  downloads: {
     type: Number,
      default: 0
     },
});

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
