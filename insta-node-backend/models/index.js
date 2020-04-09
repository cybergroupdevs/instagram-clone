const user = require("./user");
const post = require("./post");
const like = require("./like");
const comment = require("./comment");
const reply = require("./reply");
const follower=require('./follower');
const following=require('./following');
module.exports = {
    user: user,
    post:post,
    like: like,
    comment:comment,
    follower:follower,
    following:following,
    reply
}