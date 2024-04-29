const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true }, // Trim whitespace
  content: { type: String, required: true },
  image: { type: String }, // URL for the uploaded image (consider using a cloud storage service like Amazon S3 or Google Cloud Storage for scalability and security)
  date: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional: Reference user if desired
  category: { type: String }, // Optional: Categorize news items
  isPublished: { type: Boolean, default: false }, // Control news visibility
});

module.exports = mongoose.model('News', newsSchema);
