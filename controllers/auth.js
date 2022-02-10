const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/ErrorResponse')
const User = require('../models/User')



exports.register = asyncHandler(async (req, res, next) => {

  const {
    name,
    surname,
    phone,
    role,
    email,
    password
  } = req.body

  const user = await User.create({
    name,
    surname,
    phone,
    role,
    email,
    password
  })

  const token = user.getSignedJwtToken()

  res.status(201).json({
    success: true,
    data: user,
    token,
  })

})


exports.login = asyncHandler(async (req, res, next) => {
  const {
    email,
    password
  } = req.body

  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400))
  }

  const user = await User.findOne({
    email
  }).select('+password')

  if (!user) {
    return next(new ErrorResponse('invalid credentials', 401))
  }

  const isMatch = await user.matchPassword(password)

  if (!isMatch) {
    return next(new ErrorResponse('invalid credentials', 401))
  }

  const token = user.getSignedJwtToken()

  res.status(201).json({
    success: true,
    data: {
      user,
      token
    }
  })

})


// TODO: logout
exports.logout = asyncHandler(async (req, res, next) => {
  const {
    refreshToken
  } = req.cookies
  const token = await tokenService.removeToken(refreshToken)
  res.clearCookie('refreshToken')

  res.status(200).json({
    success: true,
    data: token
  })
})