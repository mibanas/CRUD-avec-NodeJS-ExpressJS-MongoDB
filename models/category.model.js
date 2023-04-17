const {Schema, model} = require('mongoose')

const categoryModel = new Schema({
    label : String,
    icon : String,
    color : String,
    // products : [{type : Schema.Types.ObjectId, 'ref' : 'Product'}]
})

exports.Category = model('Category', categoryModel)

