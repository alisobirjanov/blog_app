const {Schema, model} = require('mongoose')

const ImageSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
})



module.exports = model('Image', ImageSchema)