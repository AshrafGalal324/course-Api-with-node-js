const jwt=require('jsonwebtoken');

const httpStatus=require('../utils/httpStatus');
const appError=require('../utils/appError');
const verifyToken=(req,res,next)=>{
    const authHeader=req.headers['Authorization'] || req.headers['authorization']

    if(!authHeader){
        const error=appError.create('token is required',401,httpStatus.ERROR);
    return next(error);
    }

    const token=authHeader.split(' ')[1];
    try{

    const currentuser=jwt.verify(token,process.env.JWT_SECRET_KEY);//current user

    req.currentuser=currentuser;//available for any middleware :look at allowedTo

    next();//continue
    }catch(err){
        const error=appError.create('invalid token',401,httpStatus.ERROR);
    return next(error);
        
    }

   
}

module.exports=verifyToken;