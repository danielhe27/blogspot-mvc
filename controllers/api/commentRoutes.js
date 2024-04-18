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

// Endpoint to create a new comment, with authentication
router.post('/', withAuth, (req, res) => {
  if (!req.session) {
      return res.status(401).json({ error: 'Unauthorized to create comment' });
  }
  
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