const express = require('express')
const router = express.Router()

const {
    dashboard,
    login
} = require('../controllers/main')

const {
    authenticationMiddleware
} = require('../middleware/auth')


router.route('/dashboard').get(authenticationMiddleware,dashboard)
router.route('/login').post(login)

module.exports = router