const user = require('./user');
const post = require('./user-post');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
module.exports = {
    ownerId: {
        type: ObjectId,
        ref:'user'
    },
    uploadId: {
        type: ObjectId,
        ref:'post'
    },
    comment: {
        type: String
    }
}
