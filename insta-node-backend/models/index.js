const userDb = require("./userModel");
const postDb = require("./postsModel");
const likeDb = require("./likesModel");
const commentDb = require("./commentsModel");
const followerDb=require('./followerModel');
const followingDb=require('./followingModel');

module.exports = {
    user: userDb,
    posts:posttDb,
    likes: likeDb,
    comments:commentDb,
    followers:followerDb,
    following:followingDb
}