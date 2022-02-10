const asyncHandler = require('../middleware/async')
const Category = require('../models/Category')

const ErrorResponse = require('../utils/ErrorResponse')

exports.createCategory = asyncHandler(async (req, res, next) => {
  req.body.author = req.user._id
  const category = await Category.create(req.body)

  res.status(200).json({
    success: true,
    data: category,
  })

})
exports.getCategories = asyncHandler(async (req, res, next) => {
  const category = await Category.find()

  res.status(200).json({
    success: true,
    data: category,
  })

})

exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id)

  if (!category) {
    return next(new ErrorResponse('Not found', 404))
  }

  res.status(200).json({
    success: true,
    data: category,
  })

})

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findOneAndDelete({
    id: req.params.id,
    author: req.user._id
  })

  if (!category) {
    return next(new ErrorResponse('Not found', 404))
  }

  res.status(200).json({
    success: true,
    data: category,
  })

})


exports.updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Bootcamp.findByIdAndUpdate({_id: req.params.id, author: req.user._id}, req.body, {
    new: true,
    runValidators: true
  })

  if (!category) {
    return next(new ErrorResponse('Not found', 404))
  }

  res.status(200).json({
    success: true,
    data: category,
  })

})