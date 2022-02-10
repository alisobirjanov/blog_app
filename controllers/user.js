const asyncHandler = require('../middleware/async')
const User = require('../models/User')

const ErrorResponse = require('../utils/ErrorResponse')

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body)

  res.status(200).json({
    success: true,
    data: user,
  })

})


exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find()

  res.status(200).json({
    success: true,
    data: users,
  })

})

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if(!user) {
    return next(new ErrorResponse('Not found', 404))
  }

  res.status(200).json({
    success: true,
    data: user,
  })

})

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id)

  if(!user) {
    return next(new ErrorResponse('Not found', 404))
  }

  res.status(200).json({
    success: true,
    data: user,
  })

})

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate({_id: req.params.id, author: req.user._id}, req.body, {
    new: true,
    runValidators: true
  })

  if (!user) {
    return next(new ErrorResponse('Not found', 404))
  }

  res.status(200).json({
    success: true,
    data: user,
  })

})