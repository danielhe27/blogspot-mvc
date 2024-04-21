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
  
  
  router.post('/:id', withAuth, (req, res) => {
    const { comment_text, post_id } = req.body;
    const user_id = req.session.user_id;
  
    if (!comment_text || !post_id) {
        return res.status(400).json({ error: 'Comment text and post ID are required' });
    }
  
    Comment.create({
        comment_text,
        post_id,
        user_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.error("Error creating comment:", err);
        res.status(500).json({ error: 'Failed to create comment' });
    });
  });
  
module.exports = router;