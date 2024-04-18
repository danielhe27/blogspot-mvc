const router = require('express').router();

const userRoutes = require('./userRoutes.js');
const postRoutes = require('./postRoutes.js')
const commentRoutes = require('./commentRoutes.js');

router.use('/users', userRoutes);
router.user('/posts', postRoutes);
router.use('/comment', commentRoutes); 

module.exports = router;