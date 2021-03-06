const ErrorResponse = require('../utils/ErrorResponse')

const errorHandler = (err, req, res, next) => {
    // Log to console for dev
    console.log(err)

    let error = { ...err }

    error.message = err.message

    if(err.name === 'CastError') {
        console.log(err.name)
        const message = `Resource not found with id of ${err.value}`
        error = new ErrorResponse(message, 404)
    }

    // Mongoose duplicate key
    if(err.code === 11000) {
        const message =  'Duplicate field value entered'
        error = new ErrorResponse(message, 400)
    }

    // Mongoose validation error
    if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        msg: error.message || 'Server error'
    })
}

module.exports = errorHandler