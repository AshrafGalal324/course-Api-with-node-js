const mongoose=require('mongoose');
const validator=require('validator');
const userRoles=require('../utils/userRoles');

const userschema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,'filed must be avalid email address']
    },

    password:{
        type:String,
        required:true
    },
    token:{
        type:String
    },

    role:{
        type:String,
        enum:[userRoles.ADMIN,userRoles.USER,userRoles.MANAGER],//this the type of string found in role
        default:userRoles.USER
    },
    avatar:{
        type:String,
        default:'uploads/profile.png'
    }



    

})


module.exports=mongoose.model('User',userschema);
