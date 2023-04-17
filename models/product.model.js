const {Schema, model} = require('mongoose')


const schemaProduct = new Schema({
        title : {
                type : String,
                required : true,
                min : 4
        },
        description : String,
        content : String,
        brand : String,
        countStock : {
                type : Number,
                default : 0 
        },
        image : [String],
        thumbnail : String,
        rating : {
                type : Number,
                enum : [0,1,2,3,4,5],
                default : 0 
        },
        isFeatured : {
                type : Boolean,
                required : false 
        },
        price : Number,
        created_at : {
                type : Date,
                default : Date.nom
        },
        updated_at : {
                type : Date,
                default : Date.nom
        },
        category: {
                type: Schema.Types.ObjectId, ref: 'Category'
        }
})

exports.Product = model('Product', schemaProduct)

