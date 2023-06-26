const mongoose = require('mongoose');

// const connection = mongoose.connect("mongodb://127.0.0.1:27017/psc12")
const connection = mongoose.connect("mongodb+srv://application:V!$hu129@cluster0.bqmdt2n.mongodb.net/psc12")

module.exports = {connection}