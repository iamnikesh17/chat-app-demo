const mongoose=require("mongoose");

const dbConnect=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to the MongoDB database");
    }catch(error){
        console.error("Failed to connect to the database:", error.message);
        process.exit(1);
    }
}

module.exports=dbConnect;