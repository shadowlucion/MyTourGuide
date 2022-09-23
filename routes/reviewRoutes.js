const express = require('express')
const router = express.Router({mergeParams:true})
const authController = require('./../controllers/authController')
const reviewController = require('./../controllers/reviewController')



// Router for review 
router.route('/')
    .get(reviewController.getAllReviews)
    .post(
        authController.protect,
        authController.restrictTo('user'),
        reviewController.setTourUserIds,
        reviewController.createReview)




router.route('/:id')
    .get(reviewController.getSingleReview)
    .delete(
        authController.protect,
        authController.restrictTo('user','admin'),
        reviewController.deleteReview)
    .patch(
        authController.protect,
        authController.restrictTo('user','admin'),
        reviewController.updateReview)

module.exports = router