// Import necessary modules
const router = require('express').Router();

// Import route modules for different endpoints
const userRoutes = require('./userRoutes.js');
const postRoutes = require('./postRoutes.js');
const commentRoutes = require('./commentRoutes.js');

// Route middleware to handle requests for different endpoints
router.use('/users', userRoutes); 
router.use('/posts', postRoutes); 
router.use('/comment', commentRoutes); 

// Export the router for use in other parts of the application
module.exports = router;