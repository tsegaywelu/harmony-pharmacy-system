const express = require('express');
const cache =require('../middlewares/cache');
const userController = require('../controllers/users'); // Assuming controllers in 'controllers' folder

const app = express();

// Routes for user operations
app.post('/registerUser', userController.registerUser);
app.post('/loginUser', userController.loginUser);
app.get('/getCurrentUser',cache,userController.getCurrentUser);
app.get('/getAllUsers',cache,userController.getAllUsers);
module.exports = app;