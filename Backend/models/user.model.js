const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type: 'string',
            required: true,
            minLength:[3,'First name must be at list 3 characters long'],
        },
        lastname:{
            type: 'string',
            minLength:[3,'Last name must be at list 3 characters long'],
        },
    },
    email:{
        type: 'string',
        required: true,
        unique: true,
        minLength:[5,'Email must be atlist 5 characters long'],
    },
    password:{
        type: 'string',
        required: true,
        select:false,
    },
    socketId:{
        type: 'string',
    },
})

UserSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign(
        { _id: this._id }, // Payload
        process.env.JWT_SECRET, // Secret key
        { expiresIn: "5h" } // Optional: Token expiry time
    );
    return token;
};

UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};



const userModel = mongoose.model('user',UserSchema);
module.exports=userModel;

