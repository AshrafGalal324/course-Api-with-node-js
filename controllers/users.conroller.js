
const asyncWrapper=require('../middleware/asyncWrapper');

const User=require('../models/user.model');

const httpStatus=require('../utils/httpStatus');

const appError=require('../utils/appError');
const bcrypt=require('bcryptjs');

const jwt=require('jsonwebtoken');



const getAllUsers=asyncWrapper(async (req,res)=>{
    console.log(req.headers);

    const query=req.query//this found in link in postman ?limit=number&page=nummber and so on

    const limit=query.limit || 10;

    const page=query.page || 1;

    const skip=(page-1)*limit;


    //get all courses from databases using course model
    const users=await User.find({},{"__v":false,'password':false}).limit(limit).skip(skip);//and so on with price and title,,,and password:false meaning that dont return password in postman
    //res.json(courses);or
    res.json({status:httpStatus.SUUCESS,data:{users}});//from documentation from 11 min its very important
})

const register=asyncWrapper(async(req,res,next)=>{
    
    
    const{firstName,lastName,email,password,role}=req.body;

    const oldUser=await User.findOne({email:email});

    if(oldUser){
        const error=appError.create('email already exist',400,httpStatus.FAIL);
    return next(error);
    }
    //hashing password

    const hashedPassword=await bcrypt.hash(password,10);//10 this the time complexity for the hashing password
    const newuser=new User({

        firstName,
        lastName,
        email,
        password:hashedPassword,
        role,
        avatar:req.file.filename//from console.log(req.file)
    })
    //generate jwt token
    //to generate 32 random char use in cmd:require('crypto').randomBytes(32).toString('hex');
    //_______________________________________________________
   const token=await jwt.sign({email:newuser.email,id:newuser._id,role:newuser.role},process.env.JWT_SECRET_KEY,{expiresIn:'1m'});
    //from image in mobile
    newuser.token=token;
   
    //and token use to speak with other API
    //_______________________________________________________


    await newuser.save();
    res.status(201).json({status:httpStatus.SUUCESS,data:{user:newuser}})
})


const login=asyncWrapper(async (req,res,next)=>{
    const {email,password}=req.body;

    if(!email && !password){
        const error=appError.create('email and password are required',400,httpStatus.FAIL);
        return next(error);
    }
    const user=await User.findOne({email:email});
    if(!user){
        const error=appError.create('not found',500,httpStatus.ERROR);
        return next(error);
    }
    const matchedPassword=await bcrypt.compare(password,User.password)
    

    if(user && matchedPassword){
        const token=await jwt.sign({email:newuser.email,id:newuser._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:'1m'});
        return res.json({status:httpStatus.SUUCESS,data:{token}})
    }
    else{
        const error=appError.create('something wrong',500,httpStatus.ERROR);
        return next(error);
    }

})

module.exports={
    getAllUsers,

    register,

    login

}