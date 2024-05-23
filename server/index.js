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
const PostModel = require('./models/Post')

// cors and middleware setup
app.use(cors({ credentials: true, origin: ['http://localhost:5173'] }));
app.use(express.json());
app.use(cookieParser())

// salt for bcyrpt
const salt = bcrypt.genSaltSync(10);
const jwtSecret = "BestBloggs"


// MongoDb Connection
mongoose.connect("mongodb+srv://pandeymridulwork:mridul891@cohort.vcnsyzk.mongodb.net/")

// Register Api 
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {

        const userDoc = await UserModel.create({
            username,
            password: bcrypt.hashSync(password, salt)
        })
        res.json(userDoc)
    } catch (error) {
        res.status(400).json(error);
    }
})

// Login Endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await UserModel.findOne({ username });
    const passok = bcrypt.compareSync(password, userDoc.password)
    if (passok) {
        // logged in
        jwt.sign({ username, id: userDoc._id }, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json({
                id: userDoc._id,
                username
            })
        })
    }
    else {
        res.status(400).json("wrong Credentials")
    }
})

// profile endpoint
app.get('/profile', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, (err, info) => {
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
            author:info.id
        });
        res.json(postDoc)
    })
})

// to fetch data
app.get('/post', async (req, res) => {
    res.json(await PostModel.find())
})

// Server listing at
app.listen(3000, () => console.log("server running at port localhost:3000"))