const express=require('express');
const app=express();
const date=require(__dirname+'/date.js');
const mongoose=require('mongoose');
const List=require(__dirname+'/model/list')
const path=require('path')
const auth=require(path.join(__dirname,'routes','auth','auth'))
const cors=require('cors')
const verify=require(path.join(__dirname,'routes','auth','verify'))
app.use(express.json(),cors());
mongoose.connect('mongodb://localhost/todoauth',
                    {useUnifiedTopology:true,
                    useNewUrlParser:true})
    .then(()=>console.log('Connected to db..'))
    .catch((e)=>console.log(e));
//CRUD in TODO
app.use(auth)
app.get('/',verify,async(req,res)=>{
   const tasks=await List.find({})
   res.send(tasks)
});
app.post('/',verify,async(req,res)=>{
    const list=new List({
        name:req.body.name
    })
    await list.save();
    res.send(list)
})
app.put('/:id',verify,async(req,res)=>{
    const id=req.params.id;
    const update=await List.findByIdAndUpdate({_id:id},{
        name:req.body.name
    },{new:true});
    res.send(update)
});
app.delete('/:id',verify,async(req,res)=>{
    const id=req.params.id;
    const deleted=await List.findById({_id:id});
    await deleted.delete();
    console.log('sucess')
    // res.send(deleted)
})
app.listen(3000,(err)=>console.log('Server is up and running!!'))