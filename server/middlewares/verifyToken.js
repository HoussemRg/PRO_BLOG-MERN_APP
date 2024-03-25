import jwt from 'jsonwebtoken';


function verifyToken(req,res,next){
    const authToken=req.headers.authorization;
    if(authToken){
        const token=authToken.split(" ")[1];
        try{
            const decodedPeyload=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decodedPeyload;  //req.user is an object wich contain the decoded payload
            next();
        }catch(err){
            res.status(401).send("invalid token, Access denied");
        }
    }else{
        res.status(401).send("Token not provided, Access denied");
    }
}


// verify token and admin

function verifyTokenAndAdmin(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            return res.status(403).send("not allowed,only Admin");
        }
    })
}

// verify token and only user himself

function verifyTokenAndOnlyUser(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id){
            next();
        }else{
            return res.status(403).send("not allowed,only User himself");
        }
    })
}

// verify token and admin and only user himself

function verifyTokenAndAuthorization(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next();
        }else{
            return res.status(403).send("not allowed,only User himself or admin");
        }
    })
}


export {verifyToken,verifyTokenAndAdmin,verifyTokenAndOnlyUser,verifyTokenAndAuthorization};