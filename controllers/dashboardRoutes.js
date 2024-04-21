const router = require('express').Router();
const sequelize = require('../config/connection'); 
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

const postAttributes = ['id', 'title', 'content', 'created_at'];
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

router.get('/', (req, res) => {
    Post.findAll({
        where: { user_id: req.session.user_id },
        attributes: postAttributes,
        include: postIncludes
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    });
});

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
        res.render('edit-post', { post: dbPostData.get({ plain: true }), loggedIn: true });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    });
});

// router.get('/new', withAuth, (req, res) => {
//     res.render('/post', { loggedIn: true });
// });

module.exports = router;
