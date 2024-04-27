// Import necessary modules
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to get all comments
router.get("/", (req, res) => {
    // Retrieve all comments from the database
    Comment.findAll()
        .then(dbCommentData => res.json(dbCommentData)) // Send the comments as JSON response
        .catch(err => {
            // Handle errors if any occur during the database query
            console.error("Error fetching comments:", err);
            res.status(500).json({ error: 'Failed to retrieve comments' }); // Send an error response
        });
});

// Route to create a new comment
router.post('/:id', withAuth, async (req, res) => {
    try {
        // Destructure comment_text and post_id from the request body
        const { comment_text, post_id } = req.body;
        // Validate that comment_text is not empty
        if (!comment_text) {
            return res.status(400).json({ error: 'Comment text is required' }); // Send a 400 error response if comment_text is empty
        }

        // Create a new comment in the database
        const newComment = await Comment.create({
            comment_text,
            post_id,
            user_id: req.session.user_id // Associate the comment with the logged-in user
        });

        // Send a success response with the new comment data
        res.status(201).json(newComment);
    } catch (err) {
        // Handle errors if any occur during comment creation
        console.error('Error creating comment:', err);
        res.status(500).json({ error: 'Failed to create comment' }); // Send an error response
    }
});

// Export the router for use in other parts of the application
module.exports = router;
