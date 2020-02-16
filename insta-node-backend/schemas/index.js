const user=require('./user-details');
const post = require('./user-post');
const follower=require('./follower');
const following=require('./following');
const likes=require('./post-likes');
const comments=require('./upload-comment');

module.exports={
    user: user,
    upload: post,
    follower: follower,
    following: following,
    likes: likes,
    comments: comments
};