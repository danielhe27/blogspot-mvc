const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Get all users (excluding password)
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Internal server error" });
    });
});

// Get a specific user (excluding password)
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.params.id },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: { model: Post, attributes: ['title'] }
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            return res.status(404).json({ message: 'No user found with this id' });
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.error("Error finding user:", err);
        res.status(500).json({ message: "Internal server error" });
    });
});

// Create a new user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json(dbUserData);
        });
    })
    .catch(err => {
        console.error("Error creating user:", err);
        res.status(500).json({ message: "Failed to create user" });
    });
});

// User login
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({ where: { username: req.body.username } });
        if (!dbUserData) {
            return res.status(400).json({ message: 'No user with that username' });
        }
        const validPassword = await dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Incorrect password' });
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json({ user: dbUserData, message: 'You are now logged in' });
        });
    } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// User logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
