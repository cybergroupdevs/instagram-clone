var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = {
    comment: {
        type: ObjectId,
        ref: 'Comment'
    },
    repliedBy: {
        type: ObjectId,
        ref: 'User'
    },
    hearts: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}