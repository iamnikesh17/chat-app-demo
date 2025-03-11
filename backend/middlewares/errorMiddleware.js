const globalErrorHandler=async (err,req,res,next)=>{
    let message=err.message;
    let statusCode=err.statusCode || 500;
    let stack=err.stack;

    res.status(statusCode).json({
        message,
        statusCode,
        stack
    })

    next();
}

module.exports=globalErrorHandler;