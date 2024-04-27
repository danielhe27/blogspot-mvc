const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const dashboardRoutes = require('./dashboardRoutes.js');


// Route requests based on the specified path prefixes
router.use('/api', apiRoutes); // Routes for API endpoints
router.use('/dashboard', dashboardRoutes); // Routes for dashboard functionality
router.use('/', homeRoutes); // Routes for the home page

// Handle 404 errors for routes that do not match any defined paths
router.use((req, res) => {
    // Send a JSON response with 404 error information
    res.status(404).json({
        error: "404 Not Found",
        message: "The requested resource was not found on this server.",
        requestedUrl: req.originalUrl, 
        requestedMethod: req.method 
    });
});

module.exports = router;