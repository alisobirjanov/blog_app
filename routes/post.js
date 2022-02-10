const express = require('express')
const {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
} = require('../controllers/post')

const router = express.Router()

const {
  auth,
  roles
} = require('../middleware/auth')


router
  .route('/')
  .get(getPosts)
  .post(auth, roles('admin', 'super_admin'), createPost)

router
  .route('/:id')
  .get(getPost)
  .delete(auth, roles('admin', 'super_admin'), deletePost)
  .put(auth, roles('admin', 'super_admin'), updatePost)



module.exports = router