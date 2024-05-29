const express = require("express");
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require('fs');

const uploadMiddleware = multer({ dest: 'uploads/' });
const UserModel = require("./models/User");
const PostModel = require('./models/Post');
const { login } = require("./Controllers/login.controller");
const { register } = require("./Controllers/register.controller");

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://blogez.vercel.app/"]
}));

app.options('*', cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://blogez.vercel.app/"]
}));

app.use('/uploads', express.static(__dirname + "/uploads"));

const salt = bcrypt.genSaltSync(10);
const jwtSecret = "BestBloggs";

mongoose.connect("mongodb+srv://pandeymridulwork:mridul891@cohort.vcnsyzk.mongodb.net/");

app.post('/register', register);
app.post('/login', login);

app.get('/profile', async (req, res) => {
    const { token } = req.cookies;
    await jwt.verify(token, jwtSecret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
});

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, info) => {
        if (err) throw err;
        const { title, summary, content } = req.body;
        const postDoc = await PostModel.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id
        });
        res.json(postDoc);
    });
});

app.get('/post', async (req, res) => {
    res.json(
        await PostModel.find()
            .populate('author', ['username'])
            .sort({ createdAt: -1 })
            .limit(20)
    );
});

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const posDoc = await PostModel.findById(id).populate('author', ['username']);
    res.json(posDoc);
});

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, info) => {
        if (err) throw err;

        const { id, title, summary, content } = req.body;
        const postDoc = await PostModel.findById(id);

        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(400).json('You are not an author');
        }
        await postDoc.updateOne({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover
        });
        res.json(postDoc);
    });
});

app.listen(3000, () => console.log("Server running at port localhost:3000"));
