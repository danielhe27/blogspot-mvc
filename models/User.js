const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// Define the User model class, extending the Model class provided by Sequelize
class User extends Model {
    // Method to check if the provided password matches the user's hashed password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,  
        validate: {
            isEmail: true 
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4]  
        }
    }
}, {
    sequelize,
    modelName: 'user',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    hooks: {
   // Hook executed before creating a new user record
   async beforeCreate(newUserData) {
    newUserData.password = await bcrypt.hash(newUserData.password, 10); // Hash the user's password
    return newUserData; // Return the modified user data
},
// Hook executed before updating an existing user record
async beforeUpdate(updatedUserData) {
    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10); // Hash the updated password
    return updatedUserData; // Return the modified user data
}
}
});

module.exports = User;
