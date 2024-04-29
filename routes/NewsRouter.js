const express = require('express');
const newsController = require('../controllers/news');
const cache =require('../middlewares/cache')
const app = express();

// Middleware (optional)
// app.use(express.json()); // Parses incoming JSON data (if needed)

// Routes for news articles
app.post('/createNews',cache, newsController.createNews); // Create news article
app.get('/getNews',cache, newsController.getNews); // Get all news articles
app.get('/getNewsById/:id',cache, newsController.getNewsById); // Get news article by ID
app.put('/updateNews/:id',cache, newsController.updateNews); // Update news article
app.delete('/deleteNews/:id',cache, newsController.deleteNews); // Delete news article
module.exports = app;