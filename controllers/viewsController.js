const Tour = require('./../models/Tour')
const AppError = require('./../utils/appError')
const catchAsync = require('./../utils/catchAsync')
const User = require('./../models/userModel')


exports.getOverview = catchAsync(async (req,res,next)=>{
  // 1) Get Tour Data
  const tours = await Tour.find();

  // 2) Pass this data for rendering
  res.status(200)
  .set(
    'Content-Security-Policy',
    "script-src-elem 'self' https://*.mapbox.com ;",
    "script-src-elem 'self' https://cdnjs.cloudflare.com ;"  
  )
  .render('overview',{
    title:'All tours',
    tours  
  });
})

// const upper = (element)

exports.getTour = catchAsync(async (req,res,next)=>{
  const tour = await Tour.findOne({slug:req.params.slug}).populate({
    path:'reviews'
  }).populate({
    path:'guides',
    select: 'role name -_id photo'
  })
  
  if(!tour){
    return next(new AppError('There is no tour with that name.',404))
  }

  res.status(200)
  .set(
    'Content-Security-Policy',
    "default-src 'self' https://*.mapbox.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
  )
  .render('tour',{
    tour
  })
})


exports.getLoginForm = catchAsync(async (req,res,next)=>{
  res.status(200)
  .set(
    'Content-Security-Policy',
    "script-src-elem 'self' https://cdnjs.cloudflare.com ;"  
  )
  .render('login',{
    title: 'Log into your account'
  })
})


exports.getAccount = catchAsync(async (req,res,next)=>{
    res.status(200).render('account',{
      title: 'Your account'
    })
})

exports.updateUserData = catchAsync(async (req,res,next)=>{
    console.log(req.body.email,req.body.name)
    const updatedUser = await User.findByIdAndUpdate(req.user.id,{
      email:req.body.email,
      name: req.body.name
    },{
      new: true,
      runValidators: true
    })

    res.status(200).json({
      user:updatedUser
    })
    // res.status(200).render('account',{
    //   title: 'Your Account',
    //   user:updatedUser
    // })
})  

