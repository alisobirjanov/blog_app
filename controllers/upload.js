const asyncHandler = require('../middleware/async')
const Image = require('../models/Image')


exports.uploadImage = asyncHandler(async (req, res, next) => {
  const image = await Image.create({
    url: req.file.path
  })

  res.status(200).json({
    success: true,
    data: [],
  })

})