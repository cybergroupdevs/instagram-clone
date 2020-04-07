var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = {
    likedBy: {  
        type: ObjectId,
        ref: 'User'
    },
    post: {
        type: ObjectId,
        ref: 'Post'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}
