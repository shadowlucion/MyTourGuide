const {CustomError} = require('../errors')
const errorHandler = async (err,req,res,next)=>{
    if(err instanceof CustomError){
        return res.status(500).json({msg:err.message})
    }
     return res.status(500).json({msg:'error came'})
}

module.exports = errorHandler