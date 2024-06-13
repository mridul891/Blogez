const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const dotenv = require("dotenv")
const path = require('path')
// Use CORS middleware
app.use(cors(
    {
        origin: ["http://localhost:5173", "http://127.0.0.1:5173", "https://blogez.vercel.app"],
        methods: ["GET", "POST"],
        credentials: true,
        allowedHeaders: "*",
    }
));

// dotenv config 
dotenv.config({
    path: ".env"
})
// app.options('*', cors(corsOptions)); // Pre-flight requests
-
app.use(express.json());
app.use(cookieParser());

const uploadMiddleware = multer({ dest: 'uploads/' });

// Controllers
const { login } = require("./Controllers/login.controller");
const { register } = require("./Controllers/Register.controller");
const { logout } = require("./Controllers/logout.controller");
const { createPost } = require("./Controllers/createpost.controller");
const { profile } = require("./Controllers/getprofile.controller");
const { getpost } = require("./Controllers/getpost.controller");
const { postById } = require("./Controllers/getpostbyid.controller");
const { deletepost } = require("./Controllers/deletepost.controller");
const { editpost } = require("./Controllers/editpost.controller");



app.use('/uploads', express.static(__dirname + "/uploads"));


const port = process.env.PORT || 3000
mongoose.connect(process.env.MONGODB_URL);

// Endpoints
app.post('/register', register);

app.post('/login', login);

app.get('/profile', profile);

app.post('/logout', logout);

app.post('/post', uploadMiddleware.single('file'), createPost);

app.get('/post', getpost);

app.get('/post/:id', postById);

app.post('/postedit', editpost);

app.post('/post/:id', deletepost);

app.listen(port, () => console.log("Server running at port localhost:3000"));

