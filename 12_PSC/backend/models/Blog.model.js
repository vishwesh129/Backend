const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title : String,
    description : String,
    category : String,
    time : {type : Date , default : new Date()},
    author_id : String
})

const Blogmodel = mongoose.model('blog' , blogSchema);

module.exports = {Blogmodel}