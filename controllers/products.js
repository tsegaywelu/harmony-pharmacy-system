const path = require("path");
const redis = require("redis");
const redisClient = redis.createClient();
const Product = require("../models/product");
const multer = require("multer");


const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.send({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};
  const getProducts = async (req, res) => {
    try {
      const { category = [] } = req.body;
      let filters = {};
  
      // filter by category
      if (category.length > 0) {
        filters.category = { $in: category };
      }
  
      const products = await Product.find(filters)
        .sort({ createdAt: -1 });
      res.send({
        success: true,
        data: products,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  };
  
  const getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.send({
        success: true,
        data: product,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  };

  // Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder where uploaded files will be stored
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Set the file name for the uploaded image
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});
  // Initialize Multer with the storage configuration
  const upload = multer({ storage: storage });


// Controller function for uploading an image to a product
const uploadImageToProduct = async (req, res) => {
  try {
    // Upload image to local storage
    const imagePath = req.file.path;

    // Retrieve user ID from Redis session
    const sessionId = req.header("authorization").split(" ")[1];
    redisClient.get(sessionId, async (err, userId) => {
      if (err) {
        throw new Error("Failed to retrieve user session from Redis");
      }

      // Add image path to product
      const productId = req.body.productId;
      await Product.findByIdAndUpdate(productId, {
        $push: { images: imagePath },
      });

      res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        data: imagePath,
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// edit a product
const UpdateProduct=async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};
// delete a product
 const DeleteProduct=async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addProduct,getProducts,uploadImageToProduct,getProductById,UpdateProduct,DeleteProduct };
