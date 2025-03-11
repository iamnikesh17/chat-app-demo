const User = require("../models/User");
const appError = require("../utils/appError");
const generateToken = require("../utils/generateToken");
const cloudinary=require("../config/cloudinary");

const registerUser=async (req,res,next)=>{
    try{
        const {fullname,email,password}=req.body;
        if(!fullname || !email || !password){
            return next(appError("All fields are required",400))
        }

        const user=await User.findOne({email}).select("-password");
        if(user){
            return next(appError("Email already exists",400))
        }

        const newUser=await User.create({
            fullname,
            email,
            password
        })
        generateToken(newUser._id,res);
        res.status(201).json(newUser);


    }catch(error){
        next(appError(error.message))
    }
}


const loginUser=async (req,res,next)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return next(appError("Email and password are required",400))
        }

        const user=await User.findOne({email});
        if(!user){
            return next(appError("Invalid email or password",401))
        }

        const checkPassword=await user.comparePassword(password);
        if(!checkPassword){
            return next(appError("Invalid email or password",401))
        }

        generateToken(user._id,res);

        res.status(201).json(user);

    } catch (error) {
        next(appError(error.message))
    }
}

const logoutUser=async (req,res,next)=>{
    try {
        res.cookie("jwt","",{
            expires:new Date(0),
            httpOnly:true,
            secure: process.env.NODE_ENV!=='development',
            sameSite: "strict"
        })

        res.status(200).json({
            success:true,
            msg:"Logged out successfully"
        })
    } catch (error) {
        next(appError(error.message,401))
    }
}



const updateProfile=async (req,res,next)=>{
    try{
        const {profilePic}=req.body;
        if(!profilePic){
            return next(appError("Profile picture is required",400))
        }
        const uploadResponse=await cloudinary.uploader.upload(profilePic);
        const updateUser=await User.findByIdAndUpdate(req.user._id,{image:uploadResponse.secure_url},
            {new:true},
            {runValidators:true}
        )
        res.json(updateUser)
    }catch(error){
        next(appError(error.message))
    }
}


const checkAuth=async (req,res,next)=>{
    try{
        const user=req.user;
        if(!user){
            return next(appError("You are not logged in. Please log in to access this route.",401))
        }
        res.status(200).json(user)
    }catch(error){
        next(appError(error.message,401))
    }
}
module.exports={
    registerUser,
    loginUser,
    logoutUser,
    updateProfile,
    checkAuth
 
}