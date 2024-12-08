const userModel=require('../models/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const blackListTokenModel=require('../models/blacklistToken.model');

module.exports.authUser=async(req,res,next)=>{
    try{
        const token=req.cookies.token || req.headers.authorization.split(' ')[1];

        if(!token){
            return req.status(401).json({message: "Unauthorized"});
        }

        const isBlacklisted=await blackListTokenModel.findOne({token:token});

        if(isBlacklisted){
            return res.status(401).json({message: "Unauthorized"});
        }

        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        const user=await userModel.findById(decoded._id);
        req.user=user;

        return next();
    }catch(error){
        return res.status(401).json({message: "Unauthorized"});
    }
}