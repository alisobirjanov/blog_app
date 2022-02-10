const {Schema, model, Types} = require('mongoose')


const CategorySchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
    },
    author: {
      type: Types.ObjectId,
      ref: 'User'
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = model('Category', CategorySchema)