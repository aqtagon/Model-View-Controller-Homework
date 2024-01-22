const Post = require('./Post');
const User = require('./User');
const Comment = require('./comment');

User.hasMany(Post, {
    foreignKey: 'user_id',
});