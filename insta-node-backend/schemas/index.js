const user=require('./user-details');
const post = require('./user-uploads');
const follower=require('./follower');
const following=require('./following');
const likes=require('./upload-likes');
const comments=require('./upload-comment');

module.exports={
    user: user,
    upload: post,
    follower: follower,
    following: following,
    likes: likes,
    comments: comments
};