const userModel=require('../models/user.model');

module.exports.createUser = async ({firstname,lastname,email,password}) =>{
    if(!firstname || !lastname || !email || !password){
        throw new Error('All fields are required');
    }
    const user =await userModel.create({
        fullname:{
            firstname,
            lastname
        },
        password:password,
        email:email
    })

    return user;
}



