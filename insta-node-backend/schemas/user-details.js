module.exports = {
    name: {
<<<<<<< HEAD
=======
        type: String
    },
    instaHandle: {
>>>>>>> dea045d8ecd16c06e25ceb3ce46b54221ad3d7a4
        type: String,
        default: null
    },
    instaHandle: {
        type: String,
<<<<<<< HEAD
=======
        required: true,
        unique: true,
>>>>>>> dea045d8ecd16c06e25ceb3ce46b54221ad3d7a4
        default: null
    },
    phone: {
        type: String,
<<<<<<< HEAD
=======
        max: 10,
>>>>>>> dea045d8ecd16c06e25ceb3ce46b54221ad3d7a4
        default: null
    },
    email: {
        type: String,
        default: null
    },
    password: {
        type: String,
<<<<<<< HEAD
=======
        required: true,
>>>>>>> dea045d8ecd16c06e25ceb3ce46b54221ad3d7a4
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