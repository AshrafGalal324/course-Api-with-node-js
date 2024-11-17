const mongoose=require('mongoose');

const courseschema=new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    price:{
        type:Number,

        required:true
    }
})

module.exports=mongoose.model('course',courseschema);//course =courses is an sxtinsion in mongoose