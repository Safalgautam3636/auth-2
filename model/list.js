const mongoose=require('mongoose');
const listSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        max:1000,
        min:5,
    }
});
module.exports=mongoose.model('List',listSchema)