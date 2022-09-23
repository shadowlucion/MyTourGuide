const Review = require('../models/reviewModel')
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory')



// exports.getAllReviews = catchAsync(async (req,res,next)=>{
//     let filter = {} 
//     if(req.params.tourID) filter = {tour:req.params.tourID} 
//     const reviews = await Review.find(filter)
//     res.status(200).json(
//         {
//         status: 'success',
//         results: reviews.length,
//         data: {
//             reviews
//         }
//     })
// })





// exports.createReview = catchAsync(async (req,res,next)=>{
    //     if(!req.body.tour) req.body.tour = req.params.tourID 
    //     if(!req.body.user) req.body.user = req.user.id 
    
    //     const newReview = await Review.create(req.body)
    //     res.status(201).send(
        //         {
            //             status: 'success',
            //             data: newReview
            //         }
            //     )
            // })
            
            
exports.getAllReviews = factory.getAll(Review)
exports.getSingleReview = factory.getOne(Review)
exports.setTourUserIds = (req,res,next)=>{
    if(!req.body.tour) req.body.tour = req.params.tourID 
    if(!req.body.user) req.body.user = req.user.id 
    next()
}
            
            
exports.createReview = factory.createOne(Review)
exports.deleteReview = factory.deleteOne(Review)
exports.updateReview = factory.updateOne(Review)