const mongoose = require("mongoose")
const {Schema} = mongoose;
const UsersSchema = new Schema({
    name:{
        type : String,
        required : true

    },
    email:{
        type:String,
        required : true,
        unique : true
    },
    password:{
        type:String,
        required : true
    },
    date:{
        type:Date,
        default : Date.now
    },
    

})
const User = mongoose.model('user' , UsersSchema)
// User.createIndexed();
module.exports = User;