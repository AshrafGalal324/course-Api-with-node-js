const express=require('express');

const userscontroller=require('../controllers/users.conroller');

const router=express.Router();//instead of app.get and app.post and so on

const verifyToken=require('../middleware/verifyToken');


//__________________________________________
const multer=require('multer');
const appError = require('../utils/appError');

const diskStorage=multer.diskStorage({
    destination:function(req,file,cb){
        console.log("FILE",file)
        cb(null,'uploads');
    },
     //to prevent overrite on an image with same type
    filename:function(req,file,cb){
        const ext=file.mimetype.split('/')[1];
        const fileName=`user-${Date.now()}.${ext}`;//depend on the time

        cb(null,fileName);

    }

})
const fileFilter=(req,file,cb)=>{
    const imageType=file.mimetype.split('/')[0];

    if(imageType == 'image'){
        return cb(null,true);
    }
    else{
        return cb(appError.create('file must be an image',400),false);
    }
}

const upload=multer({storage:diskStorage,fileFilter})

//those a packages used to upload image like in register
//____________________________________________

router.get('/',verifyToken,userscontroller.getAllUsers)

router.post('/:register',upload.single('avatar'),userscontroller.register)

router.post('/:login',userscontroller.login)




module.exports=router;

    
