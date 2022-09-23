const express = require('express')
const router = express.Router()
const reviewRouter = require('./reviewRoutes')
const tourController = require('../controllers/tourController')
const authController = require('../controllers/authController')


// Route from tour to reviews
router.use('/:tourID/reviews',reviewRouter)


// Statistics for problems
router.route('/monthly-plan/:year').get(
    authController.protect,
    authController.restrictTo('amdin','lead-guide','guide'),
    tourController.getMonthlyPlan);
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/top-5-cheap').get(tourController.aliasTopTour, tourController.getAllTour);


router.route('/tours-within/:distance/center/:latlng/unit/:unit')
    .get(tourController.getToursWithin);
// /tours-within?distance=233&center=-40,45&unit=mi

router.route('/distances/:latlng/unit/:unit')
    .get(tourController.getDistances);

// Everyone can get all tours but only admin and lead-guide can change it.
router.route('/')
    .get(tourController.getAllTour)
    .post(authController.protect,
        authController.restrictTo('admin','lead-guide'),
        tourController.createTour);


// Everyone can get single tour but only admin and lead-guide can change it.
router.route('/:id')
    .get(tourController.getSingleTour)
    .patch(
        authController.protect,
        authController.restrictTo('admin','lead-guide'),
        tourController.uploadTourImages,
        tourController.resizeTourImages,
        tourController.updateTour)
    .delete(
        authController.protect,
        authController.restrictTo('admin','lead-guide'),
        tourController.deleteTour);


module.exports = router