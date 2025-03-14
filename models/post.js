const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    }
});

const postSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    comments: {
        type: [commentSchema], // Embedding comments schema
        default: [] // Ensures it starts as an empty array if no comments are added
    }
})

const Post = mongoose.model("Post", postSchema);

module.exports = Post;