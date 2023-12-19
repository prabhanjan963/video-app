import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next) => {
    const token = req.cookies?.access_token || req.header("Authorization")?.replace("Bearer ","");
    if(!token) return res.status(401).json({error: 'You are not Authenticated!'})

    jwt.verify(token,process.env.JWT_SECRET,(err,user) => {
       if(err) return res.status(403).json({error: 'Token is not Valid!'})
       req.user = user;
       next()
   })
}