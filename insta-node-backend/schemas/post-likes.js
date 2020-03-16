const user = require('./user-details');
const post = require('./user-post');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
module.exports = {
    ownerId: {
        type: ObjectId,
        ref: 'user'
    },
    uploadId: {
        type: ObjectId,
        ref: 'post'
    }
}
