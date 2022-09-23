const CustomError = require('./custom-error')
const {StatusCodes} = require('http-status-codes')

class BadRequest extends CustomError{
    constructor(message){
        super(message)
        this.statuscode = StatusCodes.BAD_REQUEST
    } 
}

module.exports = BadRequest