const express = require("express");
const app = express();
const methodOverride = require("method-override");
const {v4 : uuidv4} = require("uuid");
const path = require("path");
const port = 3000;

app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended : true }));
app.use(express.json());

let posts = [
    {
        id: uuidv4(),
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAUTY0ylr-j2uFS5X9uhmz5xk5__3MyVMuug&s",
        caption: "Enjoying light breeze",
        content: "I am so happy to be here with my family and spending quality time with them.",
        comments: [
            {
                id: uuidv4(),
                description: "I wish I could have an experience like yours."
            }
        ]
    },
    {
        id: uuidv4(),
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkRX31IxYuJKNK4TNBq6KsuyZMWvcH2-l2UA&s",
        caption: "A beautiful sunset by the beach",
        content: "Watching the waves and the sun slowly setting down—it feels so peaceful.",
        comments: [
            {
                id: uuidv4(),
                description: "Absolutely stunning! Nature at its best."
            },
            {
                id: uuidv4(),
                description: "Where is this place? Looks amazing!"
            }
        ]
    },
    {
        id: uuidv4(),
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7SGXZgK0BW_wL_Yx5I5kDB21favuUttVA1Q&s",
        caption: "Morning coffee with a view",
        content: "Nothing beats the feeling of sipping coffee while watching the sunrise.",
        comments: [
            {
                id: uuidv4(),
                description: "A perfect way to start the day!"
            }
        ]
    },
    {
        id: uuidv4(),
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGpPLLsC2scMdDPT4XP6f_rQwN5Cy0SVbuog&s",
        caption: "Weekend road trip!",
        content: "Exploring new places, trying new food, and making unforgettable memories.",
        comments: [
            {
                id: uuidv4(),
                description: "Road trips are the best! Where did you go?"
            },
            {
                id: uuidv4(),
                description: "Hope you had a great time!"
            }
        ]
    },
    {
        id: uuidv4(),
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeP_6MDHA2TcJpqJEg971iDl9PjGyv4FrGUw&s",
        caption: "Freshly baked homemade cookies",
        content: "Tried a new recipe today, and the cookies turned out to be delicious!",
        comments: [
            {
                id: uuidv4(),
                description: "These look so delicious! Recipe please?"
            }
        ]
    },
    {
        id: uuidv4(),
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAF4wdi1Oim13zNnsCxTUnU38DTF6MWFZbSQ&s",
        caption: "Just finished a 10k run!",
        content: "Feeling accomplished! Pushing myself beyond limits every day.",
        comments: [
            {
                id: uuidv4(),
                description: "Wow, that’s impressive! Keep it up!"
            },
            {
                id: uuidv4(),
                description: "Running is the best therapy!"
            }
        ]
    },
    {
        id: uuidv4(),
        imageUrl: "https://images.stockcake.com/public/1/3/1/131802f6-6933-4072-8319-003ba9eae323_large/late-night-coding-stockcake.jpg",
        caption: "Late-night coding session",
        content: "Solving bugs and building something cool! Coffee is my best friend tonight.",
        comments: [
            {
                id: uuidv4(),
                description: "Been there! Coding at night hits different."
            }
        ]
    },
    {
        id: uuidv4(),
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbwJBV396aA3VFTiipjSZDiRbnbf2l4S0hww&s",
        caption: "Exploring a new hiking trail",
        content: "The fresh air, the challenge, and the breathtaking views make it worth it!",
        comments: [
            {
                id: uuidv4(),
                description: "That view is breathtaking!"
            },
            {
                id: uuidv4(),
                description: "Hiking is my favorite outdoor activity!"
            }
        ]
    },
    {
        id: uuidv4(),
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB-RDr5yOEzUtYMTvr5Z3rf7da5cS_kABoow&s",
        caption: "Trying out sushi for the first time",
        content: "Never thought I’d love sushi this much! A new favorite dish for sure.",
        comments: [
            {
                id: uuidv4(),
                description: "Did you like it? Sushi is amazing!"
            },
            {
                id: uuidv4(),
                description: "Welcome to the sushi lovers club!"
            }
        ]
    },
    {
        id: uuidv4(),
        imageUrl: "https://meditofoundation.org/media/pages/blog/how-reading-can-help-you-live-mindfully/b17ff854e0-1718557082/pexels-rahul-shah-1031588-1200x800.jpg",
        caption: "Reading a new book on mindfulness",
        content: "Taking some time off screens and diving into self-awareness.",
        comments: [
            {
                id: uuidv4(),
                description: "Mindfulness books are life-changing!"
            }
        ]
    }
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
})

//Placed it before "/posts/:id" because express think of new = :id
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
})

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
})

app.post("/posts/new", (req, res) => {
    let { imageUrl, caption, content } = req.body;

    let newPost = {
        id: uuidv4(),
        imageUrl : imageUrl,
        caption : caption,
        content : content,
        comments : []
    };

    posts.push(newPost);
    
    res.redirect("/posts");
})

app.post("/posts/:id/comments", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);

    let { description } = req.body;

    let newComment = {
        id : uuidv4(),
        description : description
    }

    post.comments.push(newComment);

    res.redirect("/posts/" + id);
})

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);

    let { imageUrl, content, description, commentId} = req.body;

    post.imageUrl = imageUrl;
    post.content = content;

    //Passsed description and commentId as array so that 
    //we could change them according to index in comments 
    //array of each post
    post.comments.forEach((comment, index) => {
        if(comment.id === commentId[index]){
            comment.description = description[index];
        }
    })
    //Basically index = 0 as use for commentId[0] and description[0]
    //Once they get used, index becomes index++

    res.redirect("/posts/" + id); //Redirecting to show route
})

app.delete("/posts/:id", (req, res) => {
    let { id }  = req.params;

    posts = posts.filter((post) => post.id !== id);

    res.redirect("/posts");
})

app.delete("/posts/comments/:id", (req, res) => {
    let { id } = req.params;
    let {postId } = req.body;
    let post = posts.find((post) => post.id === postId);

    post.comments = post.comments.filter((com) => com.id !== id);

    res.redirect("/posts/" + postId);
})

app.get("*", (req, res) => {
    res.send("This route isn't set yet");
})

app.listen(port, () => {
    console.log(`Server is listning on port ${port}`);
})