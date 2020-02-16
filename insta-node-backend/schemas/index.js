const user=require('./user-details');
const post = require('./user-post');
const follower=require('./follower');
const following=require('./following');
const likes=require('./post-likes');
const comments=require('./post-comments');

module.exports={
    user: user,
    post: post,
    follower: follower,
    following: following,
    likes: likes,
    comments: comments
};