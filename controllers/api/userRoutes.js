const router = require('express').Router();
const { Post, User, Comment } = require('./../../models');

router.get('/', async (req,res) => {
    try {
        const dbUserData = await User.findAll({
            attributes: { exclude: ['password'] },
        });
        res.json(dbUserData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'post_content', 'created_at'], 
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title'],
                    },
                },
            ],
        });
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }

        res.json(dbUserData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});