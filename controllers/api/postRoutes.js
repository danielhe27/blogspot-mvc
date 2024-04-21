const router = require('express').Router();
const {
    User,
    Post,
    Comment
} = require('../../models');
const withAuth = require('../../utils/auth');


const postAttributes = ['id', 'content', 'title', 'created_at'];
const commonIncludes = [
    {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at']
    }
];

// Get all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.findAll({
            attributes: postAttributes,
            include: commonIncludes
        });
        res.json(posts);
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// Get a single post by ID
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.id },
            attributes: postAttributes,
            include: commonIncludes
        });
        if (!post) {
            return res.status(404).json({ message: "No post found with this id" });
        }
        res.json(post);
    } catch (err) {
        console.error("Error finding post:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// Create a new post
router.post("/", async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const post = await Post.create({
            title,
            content,
            user_id: req.session.user_id
        });

        res.status(201).json(post);
    } catch (err) {
        console.error("Error creating post:", err);
        res.status(500).json({ message: "Failed to create post", error: err.message });
    }
});


// Update a post by ID
router.put("/:id", withAuth, async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const result = await Post.update({ title, content }, { where: { id: req.params.id } });

        if (!result[0]) {
            return res.status(404).json({ message: "No post found with this id" });
        }

        res.json({ message: "Post updated successfully" });
    } catch (err) {
        console.error("Error updating post:", err);
        res.status(500).json({ message: "Failed to update post", error: err.message });
    }
});

// Delete a post by ID
router.delete("/:id", withAuth, async (req, res) => {
    try {
        const { user_id } = req.session;

        const result = await Post.destroy({
            where: {
                id: req.params.id,
                user_id,
            }
        });

        if (!result) {
            return res.status(404).json({ message: "No post found with this id" });
        }

        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        console.error("Error deleting post:", err);
        res.status(500).json({ message: "Failed to delete post", error: err.message });
    }
});

module.exports = router;
