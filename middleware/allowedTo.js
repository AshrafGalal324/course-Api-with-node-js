
const appError=require('../utils/appError');
module.exports=(...roles)=>{
    //...roles:this meaning allow for ["ADMIN","MANAGER"]
    console.log(roles);
    return(req,res,next)=>{

        if(!roles.includes(req.currentuser.roles)){
            return next(appError.create('this role is not authorized',401))
        }

        next();

    }

}



