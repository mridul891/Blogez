const jwt = require('jsonwebtoken');
const PostModel = require('../models/Post');
const jwtSecret = "BestBloggs"
const fs = require('fs');

const createPost = async (req, res) => {
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
}

module.exports = { createPost }