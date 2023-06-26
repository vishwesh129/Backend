const mongoose = require('mongoose');

const connection = mongoose.connect("mongodb+srv://application:V!$hu129@cluster0.bqmdt2n.mongodb.net/?retryWrites=true&w=majority")

module.exports = {connection}