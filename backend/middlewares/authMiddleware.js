const User = require("../models/User");
const appError = require("../utils/appError")
const jwt=require("jsonwebtoken");




const protect=async (req,res,next)=>{
    try{    
        const token=req.cookies.jwt;
        if(!token){
            return next(appError("You are not logged in. Please log in to access this route.",401))
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        const user=await User.findById(decoded.userId);
        if(!user){
            return next(appError("User not found.",404))
        }
        req.user=user;
        next();
    }catch(error){
        next(appError(error.message))
    }
}

module.exports={
    protect
}





