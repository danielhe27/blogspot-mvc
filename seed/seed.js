
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');



const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true }); 
    // Seed Users
    const users = await User.bulkCreate(userData, {
        individualHooks: true, 
        returning: true,
    });

    // Seed Posts
    const posts = await Post.bulkCreate(postData.map(post => ({
        ...post,
        user_id: users[Math.floor(Math.random() * users.length)].id, 
    })), { returning: true });

    // Seed Comments
    for (const comment of commentData) {
        await Comment.create({
            ...comment,
            user_id: users[Math.floor(Math.random() * users.length)].id, 
            post_id: posts[Math.floor(Math.random() * posts.length)].id  
        });
    }

    console.log('Database seeded!');
    process.exit(0);
};

seedDatabase();