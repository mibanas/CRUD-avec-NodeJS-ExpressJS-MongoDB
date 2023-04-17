const {Schema, model} = require('mongoose')

const schemOrderItem = new Schema({
    product : {
        type : Schema.Types.ObjectId, 'ref' : 'Product',
        required : true
    },
    quantity : {
        type : Number,
        required : true
    }
})

exports.OrderItem =  model('OrderItem', schemOrderItem)