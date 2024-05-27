// all npm packages required for the project 
const express = require("express");
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const multer = require("multer")
const fs = require('fs')

// upload middleware
const uploadMiddleware = multer({ dest: 'uploads/' })
// Models imports
const UserModel = require("./models/User");
const PostModel = require('./models/Post');

// Controllers import
const { login } = require("./Contorllers/login.controller");
const { register } = require("./Contorllers/Register.controller");

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your React app's URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

app.options('*', cors(corsOptions));
app.use('/uploads', express.static(__dirname + "/uploads"))

// salt for bcyrpt
const salt = bcrypt.genSaltSync(10);
const jwtSecret = "BestBloggs"


// MongoDb Connection
mongoose.connect("mongodb+srv://pandeymridulwork:mridul891@cohort.vcnsyzk.mongodb.net/")

// Register Api 
app.post('/register', register)

// Login Endpoint
app.post('/login', login)

// profile endpoint
app.get('/profile', async (req, res) => {
    const { token } = req.cookies;
    await jwt.verify(token, jwtSecret, {}, (err, info) => {
        if (err) throw err;
        res.json(info)
    })
})


// logout endpoint 
app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
})

// Create post endpoint

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath)

    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, info) => {
        if (err) throw err;
        const { title, summary, content } = req.body
        const postDoc = await PostModel.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id
        });
        res.json(postDoc)
    })
})

// to fetch data
app.get('/post', async (req, res) => {
    res.json(
        await PostModel
            .find()
            .populate('author', ['username'])
            .sort({ createdAt: -1 })
            .limit(20)
    )
})


// getting the post from some id 
app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const posDoc = await PostModel.findById(id).populate('author', ['username'])
    res.json(posDoc)
})

//api for editing
app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + ' . ' + ext;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, info) => {
        if (err) throw err;

        const { id, title, summary, content } = req.body
        const postDoc = await PostModel.findById(id)

        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            res.status(400).json('You are not an author')
        }
        await postDoc.updateOne({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover
        })

        res.json(postDoc)
    })
});

// Server listing at
app.listen(3000, () => console.log("server running at port localhost:3000"))