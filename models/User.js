const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const bcrypt = require('bcrypt');

class User extends Model {
    
    verifyPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password);
    }
}

User.init(
    {
        
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        userEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        
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
           
            async beforeCreate(userData) {
                userData.userPassword = await bcrypt.hash(userData.userPassword, 10);
                return userData;
            },
            
            async beforeUpdate(updatedUserData) {
                updatedUserData.userPassword = await bcrypt.hash(
                    updatedUserData.userPassword,
                    10
                );
                return updatedUserData;
            },
        },
        
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);


module.exports = User;