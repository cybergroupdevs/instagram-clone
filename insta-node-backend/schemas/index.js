const user=require('./user-details');
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
};