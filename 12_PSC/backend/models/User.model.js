const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email : String,
    password : String,
    name : String,
    age : Number
})

const Usermodel = mongoose.model('user' , userSchema);

module.exports = {Usermodel}