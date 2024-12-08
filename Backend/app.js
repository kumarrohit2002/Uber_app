require('dotenv').config();
const express = require('express');
const app=express();
const cors=require('cors');
const db=require('./config/database');
const userRoutes=require('./routes/user.routes');
const cookieParser=require('cookie-parser');

app.use(cors());
db.connect();

app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(cookieParser());



app.get('/',(req, res)=>{
    res.send('Welcome to Uber Backend App');
})

app.use('/users',userRoutes);


module.exports=app;