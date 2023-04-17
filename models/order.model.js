const {Schema , model} = require('mongoose')

const schemaOrder = new Schema({
    shippingAdress : {
        type : String,
        required : true
    },
    invoiceAdress : String,
    city : String,
    country : String,
    phone : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ['shipped', 'received', 'cancled', 'pending']
    },
    totalOrder : Number,
    user : {
        type : Schema.Types.ObjectId, 'ref' : 'User',
        required : true
    },
    created_at : {
        type : Date,
        default : Date.nom
    },
    updated_at : {
        type : Date,
        default : Date.nom
    },
    orderItems : {
        type : [{
            type : Schema.Types.ObjectId, 'ref' : 'OrderItem',
            required : true
        }]
    }
})

exports.Order =  model('Order', schemaOrder)