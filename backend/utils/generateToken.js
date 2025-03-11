const jwt=require("jsonwebtoken");
const generateToken=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET_KEY,{expiresIn:"7d"})

    res.cookie("jwt",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV!=="development",
        sameSite:true,
        maxAge:1000*60*60*24*7
    })

    return token;
}

module.exports=generateToken