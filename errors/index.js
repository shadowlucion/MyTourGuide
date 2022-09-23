const UnauthenticatedError =  require('./unauthenticated')
const BadRequest = require('./bad-request')
const CustomError = require('./custom-error')
const NotFoundError = require('./not-found')

module.exports = {
    UnauthenticatedError,
    BadRequest,
    CustomError,
    NotFoundError
}

