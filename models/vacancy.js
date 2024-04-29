const mongoose = require('mongoose');

const vacancySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  department: { type: String }, // Specify department
  location: { type: String }, // Location of the vacancy
  requirements: { type: Array }, // Array of skill or experience requirements
  benefits: { type: Array }, // Array of employee benefits
  applicationEmail: { type: String, required: true }, // Email for applications
  closingDate: { type: Date }, // Optional: Deadline for application
  isActive: { type: Boolean, default: true }, // Control vacancy visibility
});

module.exports = mongoose.model('Vacancy', vacancySchema);
