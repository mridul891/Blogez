const jwt = require("jsonwebtoken")
const jwtSecret = "BestBloggs"
const fs = require("fs");
const PostModel = require("../models/Post");
const editpost = async (req, res) => {
    // let newPath = null;
    // if (req.file) {
    //     const { originalname, path } = req.file;
    //     const parts = originalname.split('.');
    //     const ext = parts[parts.length - 1];
    //     newPath = path + '.' + ext;
    //     fs.renameSync(path, newPath);
    // }

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
            //  cover: newPath ? newPath : postDoc.cover
        });
        res.json(postDoc);
    });
}

module.exports = { editpost }