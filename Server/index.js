require('dotenv').config();
const express = require('express');
const session = require('express-session');
const Server = express();
const multer = require('multer');
const cors = require('cors');

const user = require('./routes/users');
const products = require('./routes/products');
const cart = require('./routes/userCart');
const payment = require('./routes/payment');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
         cb(null,'assets');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage: storage});

Server.use(express.json());


Server.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

Server.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    isLoggedIn: false,
    adminLogin: false,
    userName: undefined,
    userID: undefined
}));
Server.use(express.static('public'));
Server.use(express.static('assets/images'));
Server.use(express.urlencoded({extended: true}));
Server.use(express.json());
Server.use('/user',user);
Server.use('/products',products);
Server.use('/cart', cart);
Server.use('/payments',payment);

Server.post('/',upload.single('image'),(req,res)=>{
    console.log(req.body,req.file);
    res.status(200).send('Connected to server');
});

Server.listen(5000,()=>{
    console.log("Server listening on port 5000");
});