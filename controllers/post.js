const asyncHandler = require('../middleware/async')
const Post = require('../models/Post')

const ErrorResponse = require('../utils/ErrorResponse')

exports.createPost = asyncHandler(async (req, res, next) => {
  req.body.author = req.user._id
  const post = await Post.create(req.body)

  res.status(200).json({
    success: true,
    data: post,
  })

})

exports.getPosts = asyncHandler(async (req, res, next) => {
  const query = {}
  if (req.query.category) {
    query.category = req.query.category
  }
  const posts = await Post.find(query)

  res.status(200).json({
    success: true,
    data: posts,
  })

})

exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    return next(new ErrorResponse('Not found', 404))
  }

  res.status(200).json({
    success: true,
    data: post,
  })

})

exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndDelete({
    id: req.params.id,
    author: req.user._id
  })

  if (!post) {
    return next(new ErrorResponse('Not found', 404))
  }

  res.status(200).json({
    success: true,
    data: post,
  })

})


exports.updatePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate({
    _id: req.params.id,
    author: req.user._id
  }, req.body, {
    new: true,
    runValidators: true
  })

  if (!post) {
    return next(new ErrorResponse('Not found', 404))
  }

  res.status(200).json({
    success: true,
    data: post,
  })

})