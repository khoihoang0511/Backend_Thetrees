var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const mongoose = require('mongoose');
require('./model/ProductModel');
require('./model/UserModel');
require('./model/CategoryModel');


var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var cartRouter = require('./routes/cart');
var categoryRouter = require('./routes/category');
var notificationRouter = require('./routes/notification');

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//kết nối api
mongoose.connect("mongodb://localhost:27017/TheTrees")
.then(()=>console.log("Connected to Mongoose.........."))
.catch(err=>console.error("could not connect to Mongoose"));


app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/category',categoryRouter);
app.use('/notification',notificationRouter);


module.exports = app;
