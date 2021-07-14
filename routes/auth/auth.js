const router=require('express').Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../../model/User');


//validation via joi
const Joi=require('@hapi/joi');
const registration=Joi.object({
    fname:Joi.string().min(3).required(),
    lname:Joi.string().min(3).required(),
    email:Joi.string().min(6).required().email(),
    password:Joi.string().min(6).required()
})
router.post('/register',async(req,res)=>{
    const emailExists=await User.findOne({email:req.body.email});
    if(emailExists){
        return res.status(404).send("Email already exist..")
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt);

    const user= new User({
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        password:hashedPassword
    })
   
    try{
        const {error}=registration.validate(req.body);
        if(error)return res.status(404).send(error.details[0].message);
        else{
            const saveUser=await user.save();
            res.status(200).send("User Created..")
        }
    }
    catch(err){
        res.status(500).send('Some glitch in the system..',err)
    }
})
const login=Joi.object({
    email:Joi.string().min(6).max(344).required(),
    password:Joi.string().min(4).max(344).required()
})
router.post('/login',async(req,res)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user)return res.status(404).send("Incorrect Email-id");
    const validatepass=await bcrypt.compare(req.body.password,user.password);
    if(!validatepass){
        res.status(400).send("Incorrect pwd")
    }
    try{
        const {error}=login.validate(req.body);
        if(error)return res.status(404).send(error.details[0].message);
        else{
            const token=jwt.sign({_id:user._id},"fdshkljajhabdkf234ihfndfjaljf");
            res.header('auth-token',token).send(token)
            res.status(200).send('Logged in')
        }
    }
    catch(err){
        res.status(500).send('Some glitch in the system..',err)
    }


})
module.exports=router;