const PostModel = require("../models/Post");

const postById = async (req, res) => {
    const { id } = req.params;
    const posDoc = await PostModel
        .findById(id)
        .populate('author', ['username']);
    res.json(posDoc);
}

module.exports = { postById }