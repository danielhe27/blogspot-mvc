const router = require('express').Router();
const sequelize = require('../config/connection'); 
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
// Define attributes to include in Post queries
const postAttributes = ['id', 'title', 'content', 'created_at'];

// Define includes for Post queries, including comments and user data
const postIncludes = [
    {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
            model: User,
            attributes: ['username']
        }
    },
    {
        model: User,
        attributes: ['username']
    }
];

// Route to get all posts for the logged-in user
router.get('/', (req, res) => {
    Post.findAll({
        where: { user_id: req.session.user_id },
        attributes: postAttributes,
        include: postIncludes
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        // Render the dashboard view with posts data and loggedIn flag
        res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    });
});

// Route to get a specific post for editing
router.get('/edit/:id', (req, res) => {
    Post.findOne({
        where: { id: req.params.id },
        attributes: postAttributes,
        include: postIncludes
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        // Render the edit-post view with the post data and loggedIn flag
        res.render('edit-post', { post: dbPostData.get({ plain: true }), loggedIn: true });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    });
});


module.exports = router;
