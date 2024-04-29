const express = require('express');
const vacancyController = require('../controllers/vacancy'); // Assuming controllers in 'controllers' folder
const cache =require('../middlewares/cache')
const app = express();

// Middleware (optional)
// app.use(express.json()); // Parses incoming JSON data (if needed)

/// Routes for vacancy operations
app.post('/createVacancy',cache, vacancyController.createVacancy);
app.get('/getVacancies',cache, vacancyController.getVacancies);
app.get('/getVacancyById/:id',cache, vacancyController.getVacancyById);
app.put('/updateVacancy/:id',cache, vacancyController.updateVacancy);
app.delete('/deleteVacancy/:id',cache, vacancyController.deleteVacancy);

module.exports = app;