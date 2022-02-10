const express = require('express')
const {
  uploadImage
} = require('../controllers/upload')

const multer = require('../middleware/uploads')
const router = express.Router()

const {
  auth,
  roles
} = require('../middleware/auth')

router.post('/', auth, roles('admin', 'super_admin'), multer.single('image'), uploadImage)

module.exports = router