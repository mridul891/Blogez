const logout = async (req, res) => {
    res.cookie('token', '').json('ok');

}

module.exports = { logout }