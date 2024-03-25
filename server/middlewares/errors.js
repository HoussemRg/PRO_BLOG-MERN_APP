

//------------------Error handler middleware-------------------//
//ERROR 500 ////

// used in uploading images because if you bring another type of files in the request it gives you an error 500 and html error 
//or any other errors that return status 500
const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode===200 ? 500 : res.statusCode;

    res.status(statusCode).send({
        message:err.message,
        stack:process.env.NODE_ENV === "production" ? null : err.stack,
    });
}

//------------------NOT FOUND middleware-------------------//

/// ERROR 404 (NOT FOUND)  /////
const notFound=(req,res,next)=>{
    const error=new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);  // give the work to the error handler now
}



export {errorHandler,notFound};