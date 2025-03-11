const express=require("express")
const http=require("http");
const { Server } = require("socket.io");


const app=express();
const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:["http://localhost:5173"]
    }
})

const getReceiverSocketId=(userId)=>{
    return userSocketMap[userId];
}
// used to store online users
const userSocketMap={};
io.on("connection",(socket)=>{
    console.log(`User connected ${socket.id}`);
    const userId=socket.handshake.query.userId;
    if(userId){
        userSocketMap[userId]=socket.id;
    }
    // it is used to broadcast to all the connected users
    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        console.log(`User disconnected ${socket.id}`);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
})



module.exports={
    app,
    server,
    io,
    getReceiverSocketId
}



