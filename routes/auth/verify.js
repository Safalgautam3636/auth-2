const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
    const token=req.header('auth-token')
    if(!token){
        return res.status(401).send("Access denied!!")
    }
    try{
        const verified=jwt.verify(token,"fdshkljajhabdkf234ihfndfjaljf");
        req.user=verified;
        next();
    }
    catch(e){
        res.status(404).send("Invalid token")
    }
}