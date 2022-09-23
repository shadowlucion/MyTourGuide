const express = require('express')
const router = express.Router()

const {login,register} =  require('../controllers/auth')

// console.log(login);
// console.log(register);


router.route('/register').post(register)
router.route('/login').post(login)

module.exports = router