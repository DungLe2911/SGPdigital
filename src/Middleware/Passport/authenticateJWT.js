import jwt from 'jsonwebtoken';

const authenticateJWT = (req,res,next) =>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token,  "Middleroom", (err, decoded)=>{
            if(err){
                return res.status(401).json({redirect: true, url: `/`, message: 'Unauthorized! Please sign in'})
            }
            req.user = decoded;
            next();
        });
    }else{
        return res.status(401).json({redirect: true, url: `/`, message: 'Unauthorized! Please sign in'})
    }
};

export default authenticateJWT;