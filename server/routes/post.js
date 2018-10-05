
const Post = require("../models/post");
const express = require('express');
const router = express.Router();

// Add new post
router.post('/posts', (req, res) => {
    let db = req.db;

    console.log('req');
    console.log(req);

    let title = req.body.title;
    let description = req.body.description;
    let email = req.body.email;
    let password = req.body.password;
    let coupon = req.body.coupon;

    let new_post = new Post({
        title: title,
        description: description,
        email: email,
        password: password,
        coupon: coupon,
    })

    new_post.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true,
            message: 'Post saved successfully!'
        })
    })
})

// Fetch all posts
router.get('/getposts', (req, res) => {
    Post.find({}, 'title description email password coupon', function (error, posts) {
        if (error) { console.error(error); }
        res.send({
            posts: posts
        })
    }).sort({ _id: -1 })
})

// Fetch single post
router.get('/post/:id', (req, res) => {
    Post.findById(req.params.id, 'title description', function (error, post) {
        if (error) { console.error(error); }
        res.send(post)
    })
})

// Update a post
router.put('/posts/:id', (req, res) => {
    Post.findById(req.params.id, 'title description', function (error, post) {
        if (error) { console.error(error); }

        post.title = req.body.title
        post.description = req.body.description
        post.save(function (error) {
            if (error) {
                console.log(error)
            }
            res.send({
                success: true
            })
        })
    })
})

// Delete a post
router.delete('/posts/:id', (req, res) => {
    Post.remove({
        _id: req.params.id
    }, function (err, post) {
        if (err)
            res.send(err)
        res.send({
            success: true
        })
    })
})

module.exports = router;