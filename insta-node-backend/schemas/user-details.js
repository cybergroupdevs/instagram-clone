module.exports = {
    name: {
        type: String
    },
    instaHandle: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        max: 10,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    password: {
        type: String,
        required: true,
        default: null
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