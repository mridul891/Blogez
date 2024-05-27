const UserModel = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "BestBloggs"


const login = async (req, res) => {
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
}
module.exports = { login }