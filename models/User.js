const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const bcrypt = require('bcrypt');

class User extends Model {
    // method to check password
    verifyPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password);
    }
}

User.init(
    {
        // Table column definitions
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // Username column
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Email column
        userEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        // Password column
        userPassword: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4],
            },
        },
    },
    {
        hooks: {
            // before create hook
            async beforeCreate(userData) {
                userData.userPassword = await bcrypt.hash(userData.userPassword, 10);
                return userData;
            },
            // Before update hook
            async beforeUpdate(updatedUserData) {
                updatedUserData.userPassword = await bcrypt.hash(
                    updatedUserData.userPassword,
                    10
                );
                return updatedUserData;
            },
        },
        // Table configuration options
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);


module.exports = User;