const router = require('express').Router();
const { User, Post, Comment } = require('../models');


const postAttributes = ['id', 'title', 'content', 'created_at'];
const commonIncludes = [
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

// Route to render the homepage with all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: postAttributes,
        include: commonIncludes
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Route to render a single post by id
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: { id: req.params.id },
        attributes: postAttributes,
        include: commonIncludes
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        const post = dbPostData.get({ plain: true });
        res.render('single-post', { post, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Route for login page; redirects if already logged in
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Route for signup page; redirects if already logged in
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

// Catch-all route for undefined paths
router.get('*', (req, res) => {
    res.status(404).send("Can't go there!");
});

module.exports = router;
