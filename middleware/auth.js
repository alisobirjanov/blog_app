const jwt = require('jsonwebtoken')
const asyncHandler = require('./async')
const ErrorResponse = require('../utils/ErrorResponse')
const User = require('../models/User')


// Protect routes
exports.auth = asyncHandler(async (req, res, next) => {
    let token;

    if(req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1]

    }
    // Make sure token exist 
    if(!token) {
        return next(new ErrorResponse('Not authorize to access this route', 401))
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

        req.user = await User.findById(decoded.id) 

        next()
    } catch(err) {
        return next(new ErrorResponse('Not authorize to access this route', 401))
    }
})


exports.roles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403))
        }
        next()
    }
}