const captainModel=require('../models/captain.model');



module.exports.createCaptain=async ({firstname,lastname,email,password,color,plate,capacity,vehicleType})=>{
    if(!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error('All field are Required !!!');
    }

    const captain= await captainModel.create({
        fullname:{
            firstname:firstname,
            lastname:lastname,
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    });

    return captain;
}