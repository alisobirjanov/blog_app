const {
    Schema,
    model,
    Types
} = require('mongoose')


const PostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
    },
    images: {
        type: [{ type: Types.ObjectId, ref: 'Image' }],
        required: false,
        ref: 'Image',
        default: []
    },
    content: {
        type: String,
        required: [true, 'Please add a content'],
        trim: true,
    },
    category: {
        type: Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    author: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = model('Post', PostSchema)