const user=require('./user-details');
<<<<<<< HEAD
const upload=require('./user-uploads');
const follower=require('./follower');
const following=require('./following');
const likes=require('./upload-likes');
const comments=require('./upload-comment');

module.exports={
    user:user,
    upload:upload,
    follower:follower,
    following:following,
    likes:likes,
    comments:comments
=======
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
>>>>>>> dea045d8ecd16c06e25ceb3ce46b54221ad3d7a4
};