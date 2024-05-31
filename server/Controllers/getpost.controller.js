const PostModel = require("../models/Post");

const getpost = async (req, res) => {
    res.json(
        await PostModel.find()
            .populate('author', ['username'])
            .sort({ createdAt: -1 })
            .limit(20)
    );
}

module.exports = { getpost }