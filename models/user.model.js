const {Schema, model} = require('mongoose')


const schemaUser = new Schema({
        username : {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true,
            unique : true
        },
        adrress : String,
        city : String,
        country : String,
        phonenumber : String,
        isAsmin : {
            type : Boolean,
            default : false
        }
})

exports.User = model('User', schemaUser)