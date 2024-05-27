const UserModel = require("../models/User");
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
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
}

module.exports = { Register }