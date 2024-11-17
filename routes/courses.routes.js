const express=require('express');
const verifyToken=require('../middleware/verifyToken');
const userRoles=require('../utils/userRoles');

const allowedTo=require('../middleware/allowedTo');


const {body}=require('express-validator');//do validation on body
const coursecontroller=require('../controllers/controller')
const router=express.Router();//instead of app.get and app.post and so on
//get all courses
router.get('/',coursecontroller.getallcourses)
//get single course
//get:always return data
//post:always put data,meaning send data from client to server
//put:update the data,that the client enter it,move the exist and change it
//patch:update the data,that the client enter it,change the object
router.get('/:courseid',coursecontroller.getcourse)
//creat a new course
router.post('/',[
    body('title')
      .notEmpty()
      .withMessage("title is required")
      .isLength({min:2})
      .withMessage("title at least 2 chars"),

    body('price')
     .notEmpty()
     .withMessage("price is required")
    ],verifyToken,coursecontroller.addcourse)

//update a new course
router.patch('/:courseId',coursecontroller.updatecourse)


//delete a course

router.delete('/:courseId',verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANAGER),coursecontroller.deletecourse);

module.exports=router;


    
