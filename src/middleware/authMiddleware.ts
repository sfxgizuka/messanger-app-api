const jwt = require('jsonwebtoken');

export const authMiddleware = async(req,res,next) => {
    console.log(req.cookies)
     const {authToken} = req.cookies;
     if(authToken){
          const deCodeToken = await jwt.verify(authToken,process.env.SECRET);
          req.myId = deCodeToken.id;
          next();
     }else{
          res.status(400).json({
               error:{
                    errorMessage: ['Please Loing First']
               }
          })
     }
}