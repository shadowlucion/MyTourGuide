const jwt = require('jsonwebtoken')
const { BadRequest } = require('../errors')

const login = async (req,res)=>{
    const {username,password} = req.body 
    // mongoose validation
    // joi 
    // check in the controller 
    if(!username || !password){
        throw new BadRequest('Kindly provide username and password')
    }

    const id = new Date().getDate()
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
    res.status(200).json({msg:'user created',token})
}

const dashboard = async (req,res)=>{
    const {username,id} = req.user 
    res.status(200).json({msg:`Hello`,data:`${username} ${id}`})
}

module.exports = {login,dashboard}