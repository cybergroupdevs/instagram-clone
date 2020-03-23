module.exports = {
    name: {
        type: String,
        required:true
    },
    instaHandle: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        max: 10,
        default: null,
        unique:true
    },
    email: {
        type: String,
        default: null,
        unique:true
    },
    password: {
        type: String,
        required: true
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
    },
    gender:{
        type:String,
        default:null,
        enum: ['Male', 'Female', 'Not to say', null]
    },
    website: {
        type: String,
        default: null
    },

}