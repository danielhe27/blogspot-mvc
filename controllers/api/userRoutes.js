const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const express = require('express');



// Create a new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = newUser.id;  
            req.session.username = newUser.username; 
            req.session.loggedIn = true;
            res.redirect('/');
        });
    } catch(err) {
        console.error("Error creating user:", err);
        res.status(500).json({ message: "Failed to create user" });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({ where: { username: req.body.username } });
        if (!dbUserData || !(await dbUserData.checkPassword(req.body.password))) {
            return res.status(400).json({ message: 'Incorrect username or password' });
        }
        
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Error logging in" });
    }
});

// User logout
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            // Handle error case, e.g., unable to destroy the session
            return res.status(500).json({ message: 'Failed to log out' });
        }
        res.clearCookie('connect.sid');  // Assuming you're using express-session
        res.status(204).send();
    });
});




module.exports = router;
