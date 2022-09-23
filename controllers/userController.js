const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const UserModel = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/userModel');
const sendEmail = require('./../utils/email');
const bcrypt = require('bcryptjs')
const factory  = require('./handlerFactory')
const multer = require('multer')
const sharp = require('sharp')

// Storing Photo Directly in the Database.
// const multerStorage = multer.diskStorage({
//     destination: (req,file,cb)=>{
//         cb(null,'public/img/users');
//     },
//     filename: (req,file,cb)=>{
//         const ext = file.mimetype.split('/')[1]
//         cb(null,`user-${req.user.id}-${Date.now()}.${ext}`)
//     }
// })

// Storing Photo into memory so that we can resize and compress it and upload in the last
const multerStorage = multer.memoryStorage()

const multerFilter = (req,file,cb)=>{
    if(file.mimetype.split('/')[0]==='image'){
        cb(null,true)
    } else{
        cb(new AppError('Not an image! Please upload only images.',400),false)
    }
}


const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})


exports.uploadUserPhoto = upload.single('photo')

exports.resizeUserPhoto = catchAsync(async (req,res,next)=>{
    if(!req.file) return next() 

    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(500,500)
        .toFormat('jpeg')
        .jpeg({quality: 90})
        .toFile(`public/img/users/${req.file.filename}`);

    next()
})


exports.getAllUsers = catchAsync(async (req,res)=>{
    const user = await User.find()
    res.status(200).send({
        status:'success',
        data: user
    })
})

// exports.getSingleUser = catchAsync(async (req,res)=>{
//     const user = await User.find(req.params.id)
//     res.status(200).send({
//         status:'success',
//         data: user
//     })
// })
exports.getSingleUser = factory.getOne(User)

// exports.setParamsIds = (req,res,next)=>{
//     console.log(req.user);
//     // req.params.id = req.user._id 
//     res.send({})
// }
exports.getMe = (req,res,next)=>{
    req.params.id = req.user.id
    next()
}


exports.updateMe = catchAsync( async (req,res,next)=>{
    console.log(req.file)
    console.log(req.body)
    // 1) Create error if user POST's password data 
    if(req.body.password || req.body.passwordConfirm){
        return next(
            new AppError(
                'This route is not for password updates. Please use /updatePassword.',
                400
            )
        )
    }


    // 2) Filtered out unwanted fields names that are not allowed to be updated 
    const  obj = {...req.body}
    const allowFields = ['name','email']
    var newObj = {} 
    
    Object.keys(obj).forEach(el=>{
        if(allowFields.includes(el)) newObj[el] = obj[el]
    })

    if(req.file) newObj.photo = req.file.filename; 

    // 3) Update user document.
    const updatedUser = await User.findByIdAndUpdate(req.user.id,newObj,{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        status:'success',
        data:{
            user: updatedUser
        }
    })
})


exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });
    
    res.status(204).json({
      status: 'success',
      data: null
    });
});

exports.deleteUser = factory.deleteOne(User)
exports.updateUser = factory.updateOne(User)
