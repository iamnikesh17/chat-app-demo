const express=require("express");
const { registerUser, loginUser, logoutUser, updateProfile, checkAuth } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const userRoutes=express.Router();

userRoutes.route("/").post(registerUser);
userRoutes.route("/login").post(loginUser);
userRoutes.route("/logout").post(logoutUser);
userRoutes.route("/update-profile").put(protect,updateProfile);
userRoutes.route("/check").get(protect,checkAuth);

module.exports=userRoutes;

