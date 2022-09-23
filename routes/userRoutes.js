const express = require('express')
const router = express.Router()
const authController = require('./../controllers/authController')
const userController = require('./../controllers/userController')


// These routes are open for everyone
router.post('/signup',authController.signup)
router.post('/login',authController.login)
router.get('/logout',authController.logout)
router.post('/forgotPassword',authController.forgotPassword)
router.patch('/resetPassword/:token',authController.resetPassword)

// Protect all routes after this middleware
router.use(authController.protect)

router.patch('/updatePassword',authController.updatePassword)
router.get('/me',userController.getMe,userController.getSingleUser)
router.patch('/updateMe',userController.uploadUserPhoto,userController.resizeUserPhoto,userController.updateMe)
router.delete('/deleteMe',userController.deleteMe)


// Only admin can access all these routes after this.
router.use(authController.restrictTo('admin'))
router.route('/')
    .get(userController.getAllUsers)
router.route('/:id')
    .get(userController.getSingleUser)
    .delete(userController.deleteUser)
    .patch(userController.updateUser)

// router.get('/getMe',
//     // authController.protect,
//     userController.getMe,
//     userController.getSingleUser
//     )


module.exports = router