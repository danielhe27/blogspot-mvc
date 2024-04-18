const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


const postAttributes = ['id', 'content', 'title', 'created_at'];
const commonIncludes = [
    {
        model: User,
        attributes: ['username']
    },
    {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
            model: User,
            attributes: ['username']
        }
    }
];

// Get all posts
router.get("/", (req, res) => {
    Post.findAll({
        attributes: postAttributes,
        order: [['created_at', 'DESC']],
        include: commonIncludes
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.error("Error fetching posts:", err);
        res.status(500).json({ message: "Internal server error" });
    });
});

// Get a single post
router.get("/:id", (req, res) => {
    Post.findOne({
        where: { id: req.params.id },
        attributes: postAttributes,
        include: commonIncludes
    })
    .then(dbPostData => {
        if (!dbPostData) {
            return res.status(404).json({ message: "No post found with this id" });
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.error("Error finding post:", err);
        res.status(500).json({ message: "Internal server error" });
    });
});

// Create a post
router.post("/", withAuth, (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
    }

    Post.create({
        title: title,
        content: content,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.error("Error creating post:", err);
        res.status(500).json({ message: "Failed to create post" });
    });
});

// Update a post
router.put("/:id", withAuth, (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
    }

    Post.update({ title, content }, { where: { id: req.params.id } })
    .then(dbPostData => {
        if (!dbPostData[0]) {
            return res.status(404).json({ message: "No post found with this id" });
        }
        res.json({ message: "Post updated successfully" });
    })
    .catch(err => {
        console.error("Error updating post:", err);
        res.status(500).json({ message: "Failed to update post" });
    });
});

// Delete a post
router.delete("/:id", withAuth, (req, res) => {
    Post.destroy({ where: { id: req.params.id } })
    .then(dbPostData => {
        if (!dbPostData) {
            return res.status(404).json({ message: "No post found with this id" });
        }
        res.json({ message: "Post deleted successfully" });
    })
    .catch(err => {
        console.error("Error deleting post:", err);
        res.status(500).json({ message: "Failed to delete post" });
    });
});

module.exports = router;
