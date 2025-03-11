const express=require("express");
const dotenv=require('dotenv');
const cookieParser=require("cookie-parser");
const cors=require('cors');
const path=require("path");
const dbConnect = require("./config/dbConnect");
const globalErrorHandler = require("./middlewares/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { server,app } = require("./config/socket");
dotenv.config();
dbConnect();

// middlewares
app.use(cors({
    origin: "http://localhost:5173", // Frontend's URL
    credentials: true // This allows sending and receiving cookies
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


// routes
app.use("/api/v1/users",userRoutes)
app.use("/api/v1/messages",messageRoutes)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend/","dist","index.html"));
    });
}

// global error handler
app.use(globalErrorHandler)

// listen to the server
server.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
 });
