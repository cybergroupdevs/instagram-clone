const mongoose = require('mongoose');
const user = require('./user-details');
var ObjectId = mongoose.Schema.Types.ObjectId;
module.exports = {
    ownerId: {
        type: ObjectId,
        ref:'user',
        default: null
    },
    url: {
        type: String,
        default: null
    },
    caption: {
        type: String,
        default: null
    },
    likesCount: {
        type: Number, 
        default: 0
    },
    commentsCount: {
        type: Number,
        default: 0
    },
    recentLikes:  [
            {
                type: ObjectId,
                ref: "user",
                default:null
            }
        ],
    hashtags: [
            {
                type: String,
                required: true, //doubt
                default:null
            }
        ],

    //No need to add any DEFAULT value, as this will be provided by the System, and not the USER
    createdAt: {
        type: Date,
        default:Date.now()
    }
}