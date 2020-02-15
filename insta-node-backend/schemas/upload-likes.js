const user = require('./user-details');
const upload=require('./user-uploads');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
module.exports = {
    ownerId: {
        type:ObjectId,
        ref: 'user'
    },
    uploadId: {
        type: ObjectId,
        ref:'user-uploads'
    }
}