var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = {
    commentedBy: {
        type: ObjectId,
        ref: 'User'
    },
    post: {
        type: ObjectId,
        ref: 'Post'
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