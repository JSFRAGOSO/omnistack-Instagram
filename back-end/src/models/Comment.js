const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    author: String,
    description: String,
    post: String,
},{
    timestamps:true,
});

module.exports = mongoose.model('Comment', CommentSchema);


