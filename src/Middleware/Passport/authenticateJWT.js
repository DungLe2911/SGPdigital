import jwt from 'jsonwebtoken';

const authenticateJWT = (req,res,next) =>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token,  "Middleroom", (err, decoded)=>{
            if(err){
                return res.status(401).json({redirect: true, url: `api/auth/signin`})
            }
            req.user = decoded;
            next();
        });
    }else{
        return res.status(401).json({redirect: true, url: `api/auth/signin`})
    }
};

export default authenticateJWT;