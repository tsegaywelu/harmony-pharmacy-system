const express = require('express');
const multer = require('multer');
const cache =require('../middlewares/cache')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Set upload destination
    },
    filename: (req, file, cb) => {
      const uniqueFileName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueFileName);
    }
  });
const upload = multer({ storage: storage });
const productController = require('../controllers/products'); // Assuming controllers in 'controllers' folder

const app = express();

// Add product (POST)
app.post('/addProduct',cache, productController.addProduct);

// Get all products (GET) with optional category filtering
app.get('/getProducts',cache, productController.getProducts);

// Get product by ID (GET)
app.get('/getProductById/:id',cache, productController.getProductById);

// Upload image to a product (POST)
app.post('/upload-image', upload.single('image'),cache, productController.uploadImageToProduct);

// Update product (PUT)
app.put('/UpdateProduct/:id',cache, productController.UpdateProduct);

// Delete product (DELETE)
app.delete('/DeleteProduct/:id',cache, productController.DeleteProduct);

module.exports = app;
