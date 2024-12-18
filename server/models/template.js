const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 250 },
  layout: { type: String, required: true }, // Stores basic layout type or identifier
  structure: { 
    type: mongoose.Schema.Types.Mixed, // Allows JSON or dynamic data
    required: true,
    default: {}, // Default is an empty object
  },
  premiumTemplate: { type: Boolean, required: true, default:false},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  image: { type: String, required: true }, 
});

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
