/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get a list of contact posts
 *     description: Retrieve a list of posts from the database
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               posts: [{ id: 1, title: 'Sample Post' }]
 */


const express = require('express');

const router = express.Router();
const Post = require('../models/Post');


//Gets all the post
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({message: err});
    }
});


//Submits a post
router.post('/', (req, res) => {
    //console.log(req.body);
    const post = new Post({
        // title: req.body.title,
        // description: req.body.description
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        favoriteColor: req.body.favoriteColor,
        email: req.body.email
    });

    post.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({message: err});
        });
});

//Gets a specific post
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({message: err});
    }
});

//Delete Post
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.deleteOne({ _id: req.params.postId });
        
        // Check if a post was actually removed
        if (removedPost.deletedCount === 1) {
            res.json({ message: 'Post deleted successfully' });
        } else {
            res.json({ message: 'Post not found or already deleted' });
        }
    } catch (err) {
        res.json({ message: err.message });
    }
});

// Update a post
// router.patch('/:postId', async (req, res) => {
//     try{
//         const updatedPost = await Post.updateOne(
//             {_id: req.params.postId},
//             {$set: {name:req.body.name}}
//         );
//         res.json(updatedPost);
//     }catch (err) {
//         res.json({message: err});
//     }
// });
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    name: req.body.name,
                    dateOfBirth: req.body.dateOfBirth,
                    favoriteColor: req.body.favoriteColor,
                    email: req.body.email,
                    pet: req.body.pet
                }
            }
        );
        res.json(updatedPost);
    } catch (err) {
        res.json({ message: err.message });
    }
});




module.exports = router;