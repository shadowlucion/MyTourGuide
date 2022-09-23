const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const authenticationMiddleware = async (req,res,next)=>{
    try{
        const autoHeader = req.headers.authorization
        
        if(!autoHeader || !autoHeader.startsWith('Bearer ')){
            throw new CustomeAPIError('No token Provided',401)
        }

        const token = autoHeader.split(' ')[1]
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const {username,id} = decoded 
        req.user = {username,id}
        next();
    }catch(error){
        throw new CustomeAPIError('Not authorized to access this route',401)
    }
}

module.exports = {
    authenticationMiddleware
}