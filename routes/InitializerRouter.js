const express = require('express');
const userRouter = require('./UserRouter');
const vacancyRouter = require('./VacancyRouter');
const productRoutes = require('./ProductRouter');
const newsRoutes = require('./NewsRouter');

const router = express.Router();


router.use('/users', userRouter);
router.use('/vacancy', vacancyRouter);
router.use('/products', productRoutes);
router.use('/news', newsRoutes);

module.exports = router;
