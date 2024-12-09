require('dotenv').config();
const express = require('express');
const app=express();
const cors=require('cors');
const db=require('./config/database');
const cookieParser=require('cookie-parser');
const userRoutes=require('./routes/user.routes');
const captainRoutes=require('./routes/captain.routes');

app.use(cors());
db.connect();

app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(cookieParser());



app.get('/',(req, res)=>{
    res.send('Welcome to Uber Backend App');
})

app.use('/users',userRoutes);
app.use('/captain',captainRoutes);


module.exports=app;