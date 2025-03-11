const Message = require("../models/Message")
const User = require("../models/User")
const appError = require("../utils/appError")
const cloudinary=require("../config/cloudinary")
const { getReceiverSocketId, io } = require("../config/socket")

const getSideUsers=async (req,res,next)=>{
    try{
        const users=await User.find({
            _id: {$ne: req.user._id}
        })
        res.status(200).json(users)
    }catch(error){
        next(appError(error.message))
    }
}


const getMessages=async (req,res,next)=>{
    try {
        const user=await User.findById(req.params.id);
        if(!user){
            return next(appError("User not found.",404))
        }

        const messages=await Message.find({
            $or:[
                {sender:req.user._id,receiver:user._id},
                {sender:user._id,receiver:req.user._id}
            ]
        })


        res.status(200).json(messages)
    } catch (error) {
        next(appError(error.message))
    }
}

const sendMessage=async (req,res,next)=>{
    try{
        const {text,image}=req.body;
        if(!text &&!image){
            return next(appError("Message text or image is required",400))
        }
        let imageUrl;
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }

        const newMessage=await Message.create({
            sender:req.user._id,
            receiver:req.params.id,
            text,
            image:imageUrl
        })

        const receiverSocketId=getReceiverSocketId(req.params.id);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        res.status(201).json(newMessage)

    }catch(error){
        next(appError(error.message))
    }
}

module.exports={
    getSideUsers,
    getMessages,
    sendMessage,
 
}