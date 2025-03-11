const express=require("express");
const { protect } = require("../middlewares/authMiddleware");
const { getSideUsers, getMessages, sendMessage } = require("../controllers/messageController");

const messageRoutes=express.Router();

messageRoutes.route("/users").get(protect,getSideUsers);
messageRoutes.route("/:id").get(protect,getMessages);
messageRoutes.route("/send/:id").post(protect,sendMessage);


module.exports=messageRoutes;