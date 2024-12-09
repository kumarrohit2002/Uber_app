 const captainModel=require('../models/captain.model');
 const captainService=require('../services/captain.service');
 const {validationResult}=require('express-validator');

 module.exports.registerCaptain=async (req,res,next)=>{
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        const {fullname,email,password,vehicle}=req.body;

        const isCaptainAlreadyRegistered=await captainModel.findOne({email:email});
        if(isCaptainAlreadyRegistered){
            return res.status(409).json({message:'Email Already Registered' , success:false});
        }

        const hashPassword=await captainModel.hashPassword(password);

        const captain=await captainService.createCaptain({
            firstname:fullname.firstname,
            lastname:fullname.lastname,
            email,
            password:hashPassword,
            color:vehicle.color,
            plate:vehicle.plate,
            capacity:vehicle.capacity,
            vehicleType:vehicle.vehicleType
        })

        const token=await captain.generateAuthToken();

        res.status(201).json({token:token,captain:captain});

    }catch(error){
        console.log('Error in register Captain: '+error.message);
        return res.status(500).json({message: error.message,success:false});
    }
 }



 module.exports.loginCaptain=async (req,res,next)=>{
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array,success:false});
        }

        const {email,password}=req.body;
        const captain= await captainModel.findOne({email}).select('+password');

        if(!captain){
            return res.status(404).json({message:"User not found",success:false});
        }
  
        const isMatch = await captain.comparePassword(password);
 
        if(!isMatch){
            return res.status(401).json({message:"Invalid email or password",success:false});
        }

        const token=await captain.generateAuthToken();
        res.cookie('token',token); //set in cookie


        res.status(200).json({token:token,captain:captain});

    }catch(error){
        console.log(error.message);
        return res.status(500).json({message:'Internal server Error',success:false});
    }
 }