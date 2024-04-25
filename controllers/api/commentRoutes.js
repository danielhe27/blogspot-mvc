const router = require('express').Router();
const {Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.get("/", (req, res) => {
    Comment.findAll()
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.error("Error fetching comments:", err);
            res.status(500).json({ error: 'Failed to retrieve comments' });
        });
  });
  
  
  router.post('/:id', withAuth, async (req, res) => {
    try {
        const { comment_text, post_id } = req.body;
        if (!comment_text) {
            return res.status(400).json({ error: 'Comment text is required' });
        }

        const newComment = await Comment.create({
            comment_text,
            post_id,
            user_id: req.session.user_id

        });

        // Send a success response with the new comment data
        res.status(201).json(newComment);
    } catch (err) {
        console.error('Error creating comment:', err);
        res.status(500).json({ error: 'Failed to create comment' });
    }
});

module.exports = router;