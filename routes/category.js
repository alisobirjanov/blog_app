const express = require('express')
const {
  getCategory,
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory
} = require('../controllers/category')

const router = express.Router()

const {
  auth,
  roles
} = require('../middleware/auth')

router
  .route('/')
  .get(getCategories)
  .post(auth, roles('admin', 'super_admin'), createCategory)

router
  .route('/:id')
  .get(getCategory)
  .delete(auth, roles('admin', 'super_admin'), deleteCategory)
  .put(auth, roles('admin', 'super_admin'), updateCategory)


module.exports = router