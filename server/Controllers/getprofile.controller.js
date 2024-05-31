const jwt = require("jsonwebtoken")
const jwtSecret = "BestBloggs"

const profile = async (req, res) => {
    const { token } = req.cookies;
    await jwt.verify(token, jwtSecret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
}

module.exports = { profile }