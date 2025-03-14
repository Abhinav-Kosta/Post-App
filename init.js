const mongoose = require("mongoose");
const Post = require("./models/post.js");

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

const posts = [
    {
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAUTY0ylr-j2uFS5X9uhmz5xk5__3MyVMuug&s",
        caption: "Enjoying light breeze",
        content: "I am so happy to be here with my family and spending quality time with them.",
        comments: [
            {
                description: "I wish I could have an experience like yours."
            }
        ]
    },
    {
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkRX31IxYuJKNK4TNBq6KsuyZMWvcH2-l2UA&s",
        caption: "A beautiful sunset by the beach",
        content: "Watching the waves and the sun slowly setting down—it feels so peaceful.",
        comments: [
            {
                description: "Absolutely stunning! Nature at its best."
            },
            {
                description: "Where is this place? Looks amazing!"
            }
        ]
    },
    {
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7SGXZgK0BW_wL_Yx5I5kDB21favuUttVA1Q&s",
        caption: "Morning coffee with a view",
        content: "Nothing beats the feeling of sipping coffee while watching the sunrise.",
        comments: [
            {
                description: "A perfect way to start the day!"
            }
        ]
    },
    {
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGpPLLsC2scMdDPT4XP6f_rQwN5Cy0SVbuog&s",
        caption: "Weekend road trip!",
        content: "Exploring new places, trying new food, and making unforgettable memories.",
        comments: [
            {
                description: "Road trips are the best! Where did you go?"
            },
            {
                description: "Hope you had a great time!"
            }
        ]
    },
    {
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeP_6MDHA2TcJpqJEg971iDl9PjGyv4FrGUw&s",
        caption: "Freshly baked homemade cookies",
        content: "Tried a new recipe today, and the cookies turned out to be delicious!",
        comments: [
            {
                description: "These look so delicious! Recipe please?"
            }
        ]
    },
    {
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAF4wdi1Oim13zNnsCxTUnU38DTF6MWFZbSQ&s",
        caption: "Just finished a 10k run!",
        content: "Feeling accomplished! Pushing myself beyond limits every day.",
        comments: [
            {
                description: "Wow, that’s impressive! Keep it up!"
            },
            {
                description: "Running is the best therapy!"
            }
        ]
    },
    {
        imageUrl: "https://images.stockcake.com/public/1/3/1/131802f6-6933-4072-8319-003ba9eae323_large/late-night-coding-stockcake.jpg",
        caption: "Late-night coding session",
        content: "Solving bugs and building something cool! Coffee is my best friend tonight.",
        comments: [
            {
                description: "Been there! Coding at night hits different."
            }
        ]
    },
    {
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbwJBV396aA3VFTiipjSZDiRbnbf2l4S0hww&s",
        caption: "Exploring a new hiking trail",
        content: "The fresh air, the challenge, and the breathtaking views make it worth it!",
        comments: [
            {
                description: "That view is breathtaking!"
            },
            {
                description: "Hiking is my favorite outdoor activity!"
            }
        ]
    },
    {
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB-RDr5yOEzUtYMTvr5Z3rf7da5cS_kABoow&s",
        caption: "Trying out sushi for the first time",
        content: "Never thought I’d love sushi this much! A new favorite dish for sure.",
        comments: [
            {
                description: "Did you like it? Sushi is amazing!"
            },
            {
                description: "Welcome to the sushi lovers club!"
            }
        ]
    },
    {
        imageUrl: "https://meditofoundation.org/media/pages/blog/how-reading-can-help-you-live-mindfully/b17ff854e0-1718557082/pexels-rahul-shah-1031588-1200x800.jpg",
        caption: "Reading a new book on mindfulness",
        content: "Taking some time off screens and diving into self-awareness.",
        comments: [
            {
                description: "Mindfulness books are life-changing!"
            }
        ]
    }
];

Post.insertMany(posts);