const user = require('./user-details');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
module.exports = {
    ownerId: {
        type: ObjectId,
        ref:'user'
    },
    followingId: {
        type: ObjectId,
        ref:'user'
    }
}