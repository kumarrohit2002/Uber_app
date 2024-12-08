const userModel=require('../models/user.model');
const userService=require('../services/user.service');
const {validationResult}=require('express-validator');
const blackListTokenModel=require('../models/blacklistToken.model');


module.exports.registerUser = registerUser= async (req,res,next) => {
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {fullname,email,password}=req.body;
        if(!fullname || !email || !password){
            return res.status(400).json({message: 'All field are Required'});
        }

        const userExist = await userModel.findOne({ email: email });
        if (userExist) {
            return res.status(409).json({ message: 'User already registered' });
        }
        
        const hashpassword=await userModel.hashPassword(password);
        
        const user= await userService.createUser({firstname:fullname.firstname,lastname:fullname.lastname,email:email,password:hashpassword});
        
        const token=await user.generateAuthToken();
        // console.log(hashpassword);
        return res.status(201).json({token,user});
    }catch(error){
        console.log(error.message);
        return res.status(500).json({message:error.message,success:false});
    }
}

module.exports.loginUser = async (req,res,next)=>{
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array,success:false});
        }

        const {email,password}=req.body;
        const user= await userModel.findOne({email}).select('+password');

        if(!user){
            return res.status(404).json({message:"User not found",success:false});
        }
  

        const isMatch = await user.comparePassword(password);
 
        if(!isMatch){
            return res.status(401).json({message:"Invalid email or password",success:false});
        }

        const token=await user.generateAuthToken();
        res.cookie('token',token); //set in cookie


        res.status(200).json({token:token,user:user});

    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message,success:false});
    }
}


module.exports.getUserProfile=async (req,res,next)=>{
    try{
        const user=req.user;
        res.status(200).json({user:user});

    }catch(error){
        console.log(error.message);
    }
}


module.exports.logoutUser=async (req,res,next)=>{
   try{
       res.clearCookie('token');
       const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
      
       await blackListTokenModel.create({token});
    res.status(200).json({message:'Logged out successfully',success:true});

   }catch(error){
    console.log(error.message);
    return res.status(500).json({message:'Logged out failed',success:false});
   }
}