var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = {
    post: {
        type: ObjectId,
        ref: 'Post'
    },
    commentedBy: {
        type: ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        maxlength: 100
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}