const CustomError = require('./custom-error')
const {StatusCodes} = require('http-status-codes')

class UnauthenticatedError extends CustomError{
    constructor(message){
        super(message)
        this.statuscode = StatusCodes.UNAUTHORIZED
    } 
}

module.exports = UnauthenticatedError