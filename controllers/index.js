const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const dashboardRoutes = require('./dashboardRoutes.js');


router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);


router.use((req, res) => {
    res.status(404).json({
        error: "404 Not Found",
        message: "The requested resource was not found on this server.",
        requestedUrl: req.originalUrl,
        requestedMethod: req.method
    });
});

module.exports = router;