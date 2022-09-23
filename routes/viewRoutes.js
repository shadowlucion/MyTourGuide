const express = require('express')
const router = express.Router()
const viewController = require('./../controllers/viewsController')
const authController = require('./../controllers/authController')
const userController = require('./../controllers/userController')
// router.use((req, res, next) => {
//     req.setHeader(
//       'Content-Security-Policy',
//       "script-src  'self' api.mapbox.com",
//       "script-src-elem 'self' api.mapbox.com",
//       "script-src 'self' https://cdnjs.cloudflare.com"
//     );
//     next();
//   });

// router.use((req, res, next) => {
//     res.header("Cross-Origin-Resource-Policy", "cross-site")
//     res.header("Cross-Origin-Opener-Policy","cross-site")
//     res.header("X-Frame-Options","cross-site")
//     res.header("SameOriginByCoep","cross-site")

    
//     next()
// })

// router.use((req,res,next)=>{
//     res.set(Cross-Origin-Opener-Policy, same-origin)
//    next()
// })




// router.use((req,res,next)=>{
//     res.setHeader(Cross-Origin-Opener-Policy, same-origin)
//   // Cross-Origin-Opener-Policy: unsafe-none
//   // Cross-Origin-Opener-Policy: same-origin-allow-popups
//   // Cross-Origin-Opener-Policy: same-origin
//   next()
// })


router.get('/',authController.isLoggedin,viewController.getOverview)
router.get('/tour/:slug',
    authController.isLoggedin,viewController.getTour)
router.route('/login').get(authController.isLoggedin,viewController.getLoginForm)
router.route('/me').get(authController.protect,viewController.getAccount)
router.route('/submit-user-data').post(authController.protect,viewController.updateUserData) 
module.exports = router 