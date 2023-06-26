const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    age: Number,
    city: String,
    deleted : {type : Boolean , default : false}
})

const Usermodel = mongoose.model("user", userSchema)

module.exports = {Usermodel}