const express = require('express');
const router = express.Router();

const userRoute = require('./user');
// If you have other entity routes, import them as well

router.use('/users', userRoute);
// Add other routes as needed, e.g., router.use('/posts', postRoute);

module.exports = router;
