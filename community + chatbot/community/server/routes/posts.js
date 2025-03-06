const express = require("express");
const fs = require("fs");
const router = express.Router();
const postsFile = "./data/posts.json";

// Read posts from file
const readPosts = () => {
    if (!fs.existsSync(postsFile)) return [];
    return JSON.parse(fs.readFileSync(postsFile, "utf8"));
};

// Save posts to file
const savePosts = (posts) => {
    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
};

// Get all posts
router.get("/", (req, res) => {
    res.json(readPosts());
});

// Create a new post
router.post("/", (req, res) => {
    const posts = readPosts();
    const newPost = { content: req.body.content, date: new Date() };
    posts.push(newPost);
    savePosts(posts);
    res.status(201).json(newPost);
});

module.exports = router;
