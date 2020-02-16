module.exports = {
    name: {
        type: String
    },
    instaHandle: {
        type: String
    },
    phone: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    password: {
        type: String
    },
    profileImage: {
        type: String,
        default: null
    },
    about: {
        type: String,
        default: null
    },
    postsCount: {
        type: Number, 
        default: 0
    },
    followers: {
        type: Number,
        default: 0
    },
    following: {
        type: Number,
        default: 0
    }
}