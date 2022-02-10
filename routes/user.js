const express = require('express')
const {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} = require('../controllers/user')

const router = express.Router()

const {
  auth,
  roles
} = require('../middleware/auth')


router
  .route('/')
  .get(getUsers)
  .post(auth, roles('super_admin'), createUser)

router
  .route('/:id')
  .get(getUser)
  .delete(auth, roles('super_admin'), deleteUser)
  .put(auth, roles('super_admin'), updateUser)



module.exports = router