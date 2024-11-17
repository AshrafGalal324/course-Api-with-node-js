const course=require('../models/courses.model');

const httpStatus=require('../utils/httpStatus');

const asyncWrapper=require('../middleware/asyncWrapper');

const {validationResult}=require('express-validator');

const AppError=require('../utils/appError');
const appError = require('../utils/appError');

const getallcourses=asyncWrapper(async (req,res)=>{

    const query=req.query//this found in link in postman ?limit=number&page=nummber and so on

    const limit=query.limit || 10;

    const page=query.page || 1;

    const skip=(page-1)*limit;


    //get all courses from databases using course model
    const courses=await course.find({},{"__v":false}).limit(limit).skip(skip);//and so on with price and title
    //res.json(courses);or
    res.json({status:httpStatus.SUUCESS,data:{courses}});//from documentation from 11 min its very important
})

const getcourse=asyncWrapper(
  async(req,res)=>{

    //try{

   const Course=await course.findById(req.params.courseId);
   if(!Course){

    
    const error=appError.create('not found course',404,httpStatus.FAIL);
    return next(error);


      // return res.status(404).json({status:httpStatus.FAIL,data:{Course:"course not found"}})
   }
   

          return res.json({status:httpStatus.SUUCESS,data:{Course}});
//}
//catch(err){
   // return res.status(400).json({status:httpStatus.ERROR,data:null,message:err.message,code:400})
}

   

       
)
       
   
      //  }
        //res:used for write data
        //req:used to get data

const addcourse=asyncWrapper(async (req,res,next)=>{//this?
    //console.log(req.body);

    const errors =validationResult(req);

    
    if(!errors.isEmpty()){
        const error=appError.create(errors.array(),400,httpStatus.FAIL)
        return(error);
        //return res.status(400).json({status:httpStatus.FAIL,data:errors.array()});
    }

   

    const newcourse=new course(req.body);

    await newcourse.save();


    res.status(201).json({status:httpStatus.SUUCESS,data:{course:newcourse}})
    
})

const updatecourse=asyncWrapper(async (req,res)=>{
    const courseId=req.params.courseId;
  // try{
    const updatecourse=await course.updateOne({_id:courseId},{$set:{...req.body}});
    return res.status(200).json({status:httpStatus.SUUCESS,data:{course:updatecourse}})

   //}
  // catch(e){
   // return res.status(400).json({status:httpStatus.ERROR,message:e.message});
   //}
})

const deletecourse=asyncWrapper(async (req,res)=>{

    await course.deleteOne({_id:req.params.courseId});
  
    res.status(200).json({status:httpStatus.SUUCESS,data:null});
})

module.exports={
    getallcourses,

    getcourse,

    addcourse,

    updatecourse,

    deletecourse








}