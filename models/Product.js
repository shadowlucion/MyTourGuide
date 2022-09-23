const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'kindly enter name']
    },
    price:{
        type:Number,
        required:[true,'kindly enter price']
    },
    company:{
        type:String,
        enum:{
            values:['ikea','liddy','caressa','marcos'],
            message:'{VALUE} is not supported'
        }
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});


module.exports = mongoose.model('Product',productSchema)