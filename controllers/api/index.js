const router = require('express').router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js')
const commentRoutes = require('./comment-routes.js');

router.use('/users', userRoutes);
router.user('/posts', postRoutes);
router.use('/comment', commentRoutes); 

module.exports = router;