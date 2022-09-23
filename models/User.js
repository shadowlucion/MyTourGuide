const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Kindly provide name'],
        maxlength:50,
        minlength:3,
    },
    email:{
        type:String,
        required:[true,'Kindly provide email'],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
        unique:true
    },
    password:{
        type:String,
        trim:true,
        required:[true,'Please provide password'],
        minlength:6,
    },
})

UserSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)

})

UserSchema.methods.createJWT = function (){
    return jwt.sign(
        { 
        userId:this._id,
        name:this.name
        },
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_LIFETIME
        }
    )
}


// UserSchema.methods.abc = async function(email,password){ 
//     console.log('Inside abc function',email,' ',password);
//     console.log(this.email,' ',this.password);
// }



UserSchema.methods.comparePassword = async function(candidatePassword){
    console.log(candidatePassword);
    return true;
    // return await bcrypt.compare(candidatePassword,this.password)
}


module.exports = mongoose.model('User',UserSchema)