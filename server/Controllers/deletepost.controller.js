const PostModel = require("../models/Post");

const deletepost = async (req, res) => {
    const { id } = req.params;
    const posDoc = await PostModel.findByIdAndDelete(id)
    res.json("ok");
}

module.exports = { deletepost }