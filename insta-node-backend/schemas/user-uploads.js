module.exports = {
    OwnerId: {
        type: String,
        default: null
    },
    Url: {
        type: String,
        default: null
    },
    Caption: {
        type: String,
        default: null
    },
    //This will also include all the hashtags, and everything about Posts
    AboutPost: {
        type: String,
        default: null
    },
    LikesCount: {
        type: Number, 
        default: 0
    },
    CommentsCount: {
        type: Number,
        default: 0
    },
    RecentLikes: {
        type: Array,
        default: null
    },
    //No need to add any DEFAULT value, as this will be provided by the System, and not the USER
    CreatedAt: {
        type: Date
    }
    // //If the POST is shared, then it will be set to TRUE, so that we can recognize whether the post was shared or does it actually belong to the USER
    // IsShared: {
    //     type: Boolean,
    //     default: false
    // }
}