const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]  // Ensures title is at least 1 character long
        }
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]  // Ensures content is at least 1 character long
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,  // Assuming it can be null if the post is not directly associated with a user
        references: {
            model: 'user',  // Links to the User model
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'post',
    freezeTableName: true,
    underscored: true
});

module.exports = Post;
