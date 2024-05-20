const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


app.post('/register', (req, res) => {
    const { username, password } = req.body;
    res.json({ requestData: { username, password } })
})

app.listen(3000, () => console.log("server running at port localhost:3000"))