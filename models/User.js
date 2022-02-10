const {
  Schema,
  model,
  Types
} = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },
  surname: {
    type: String,
    required: [true, 'Please add a surname'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add a email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Plase add a valid email {VALUE}'
    ],
    unique: [true, 'unique {VALUE}']
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone'],
    trim: true,
  },
  interested_category: {
    type: Types.ObjectId,
    ref: 'Category'
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'super_admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please add a password']
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password)
}


UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({
    id: this._id
  }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

module.exports = model('User', UserSchema)