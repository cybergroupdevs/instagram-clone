const user = require('./user-details');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
module.exports = {
    ownerId: {
        type: ObjectId,
        ref:'user'
    },
    followerId: {
        type: ObjectId,
        ref:'user'
    }
}