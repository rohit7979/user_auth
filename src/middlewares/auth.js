const jwt = require('jsonwebtoken');
require('dotenv').config;

const auth = (req,res,next)=>{
    // console.log(req.headers);
    const header = req.headers.authorization;
    if(!header){
       res.json({message : "header is not present"})
    }
 
    const token = header.split(' ')[1]
   let decode = jwt.verify(token,process.env.SECRET_KEY)
   if(!decode){
    return res.json({message : "this is not a valid token"})
 }else{
    next()
 }
//    console.log(decode)
}


module.exports = auth;