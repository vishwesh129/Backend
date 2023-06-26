const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email : String,
    password : String,
    name : String,
    age : Number,
    role : {type : String, default : "customer", enum : ["customer", "seller"]}
})

const Usermodel = mongoose.model('user' , userSchema);

module.exports = {Usermodel}