const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        min:6,
        max:25
    },
    lname:{
        type:String,
        required:true,
        min:5,
        max:25
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        min:5,
        max:25
    },
    date:{
        type:Date,
        default:Date.now(),
        required:true
    }
})
module.exports=mongoose.model('User',userSchema);