const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  image: { type: String }, // URL for the uploaded image (consider cloud storage)
  price: { type: Number, required: true },
  category: { type: String }, // Categorize products
  stock: { type: Number, default: 0 }, // Inventory tracking
  isActive: { type: Boolean, default: true }, // Control product availability
});

module.exports = mongoose.model("Product", productSchema);
