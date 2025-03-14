const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Post = require("./models/post.js");
const methodOverride = require("method-override");
const path = require("path");
const port = 3000;

app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended : true }));
app.use(express.json());

main()
    .then(() => {
        console.log("DB connection successful");
    })
    .catch((err) => {
        console.log(err);
    })

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/insta");
}

app.get("/posts", async (req, res) => {
    let posts = await Post.find();
    res.render("index.ejs", { posts });
})

//Placed it before "/posts/:id" because express think of new = :id
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.get("/posts/:id", async (req, res) => {
    let { id } = req.params;

    let post = await Post.findById(id);

    res.render("show.ejs", { post });
})

app.get("/posts/:id/edit", async (req, res) => {
    let { id } = req.params;

    let post = await Post.findById(id);

    res.render("edit.ejs", { post });
})

app.post("/posts/new", (req, res) => {
    let { imageUrl, caption, content } = req.body;

    let newPost = new Post({
        imageUrl : imageUrl,
        caption : caption,
        content : content,
    });

    newPost.save()
        .then(() => {
            console.log("New post created");
        })
        .catch((err) => {
            console.log(err);
        })
    
    res.redirect("/posts");
})

app.post("/posts/:id/comments", async (req, res) => {
    let { id } = req.params;

    let post = await Post.findById(id);

    let { description } = req.body;

    let newComment = { description };

    post.comments.push(newComment);

    post.save()
        .then(() => {
            console.log("Comment added successfully.");
        })
        .catch((err) => {
            console.log(err);
        })
            
    res.redirect("/posts/" + id);
})

app.patch("/posts/:id", async (req, res) => {
    let { id } = req.params;
    let post = await Post.findById(id);

    let { imageUrl, content, description, commentId} = req.body;

    post.imageUrl = imageUrl;
    post.content = content;

    //Passsed description and commentId as array so that 
    //we could change them according to index in comments 
    //array of each post
    post.comments.forEach((comment, index) => {
        if(comment.id.toString() === commentId[index]){
            comment.description = description[index];
        }
    })
    //Basically index = 0 as use for commentId[0] and description[0]
    //Once they get used, index becomes index++

    post.save()
        .then(() => {
            console.log("Post updated successfully");
        })
        .catch((err) => {
            console.log(err);
        })

    res.redirect("/posts/" + id); //Redirecting to show route
})

app.delete("/posts/:id", async (req, res) => {
    let { id }  = req.params;

    await Post.findByIdAndDelete(id);

    res.redirect("/posts");
})

app.delete("/posts/comments/:id", async (req, res) => {
    let { id } = req.params;
    let {postId } = req.body;

    let post = await Post.findById(postId);

    // Filter out the comment with the given ID
    post.comments = post.comments.filter(comment => comment._id.toString() !== id);

    post.save()
        .then(() => {
            console.log("comment deleted successfully");
        })
        .catch((err) => {
            console.log(err);
        })

    res.redirect("/posts/" + postId);
})

app.get("*", (req, res) => {
    res.send("This route isn't set yet");
})

app.listen(port, () => {
    console.log(`Server is listning on port ${port}`);
})