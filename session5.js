//npm init -y :to creat package of jason
//npm install express for file jason
const fs = require("fs");
const express=require('express');
const path=require('path');
const cors=require('cors');//used in error in frontend and this use to show the data of backend
const httpStatus=require('./utils/httpStatus');
const usersRouter=require('./routes/users.routes');


require('dotenv').config()//used to get .env to process.env
//CRUD:(create/read/updat/delete)
const app=express();
app.use(express.json())

const mongoose=require('mongoose');

const url=process.env.MONGO_URL;

mongoose.connect(url).then(()=>{
   
    console.log('mongodb connect success')
})

app.use(cors());

const coursesRouter=require('./routes/courses.routes');

app.use('/uploads',express.static(path.join(__dirname,'uploads')));//used to make a folder static to prevent an error in postman,and use to one or more images

app.use('/api/courses',coursesRouter)
app.use('/api/users',usersRouter)

//gobal middleware for not found router
app.all('*',(req,res,next)=>{//MEANS THAT AFTER MOVE TO ALL PATH AND DONT FOUND SPECIFIC PATH RETURN THIS MESSAGE AND * MEANS ALL PATH
   return res.status(404).json({status:httpStatus.ERROR,message:'this resource is not available'});
})
//global error handler
app.use((error,req,res,next)=>{
    res.status(error.statusCode || 500).json({status:error.statusText || httpStatus.ERROR,message:error.message,code:error.statusCode || 500,data:null});

})


//app.listen(process.env.PORT || 4000,()=>{
  //  console.log("the server on port 5000");
    
//})//OR

app.listen(5000,()=>{

    console.log("the server on port 5000");

})