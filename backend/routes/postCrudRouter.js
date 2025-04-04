const express = require("express");
const PostSchema = require("../models/post.model");
const {authenticateToken} = require("../utilities.js");

const PostRouter = express.Router();


PostRouter.post("/add", authenticateToken, async (req, res) => {
    const { title, description, tags } = req.body;
    const user = req.user;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }
    if (!description) {
        return res.status(400).json({ message: "Description is required" });
    }
    
    try {
        const post = new PostSchema({
            title,
            description,
            tags: tags || [],
            userId: user.id,
        });

        await post.save();
        return res.json({
            error: false,
            post,
            message: "Post added successfully, no issue!"
        });

    } catch (error) {
        console.error("Post creation error:", error); // Add this line to see actual error in console
        return res.status(500).json({
            error: true,
            message: "Internal Server Error!!"
        });
    }
});


module.exports = PostRouter;
