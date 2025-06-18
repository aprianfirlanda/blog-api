const express = require('express');
const router = express.Router();
const userRoute = require('./user');
const postRoutes = require('./post');

router.use('/users', userRoute);
router.use('/posts', postRoutes);

module.exports = router;
