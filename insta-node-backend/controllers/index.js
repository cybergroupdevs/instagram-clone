const loginSignup=require('./login-signup-controller');
const post=require('./posts-controller');
const  user=require('./user')
const follow=require('./follow')
const unfollow=require('./unfollow')
const posts = require('./posts_upload');
const likes=require('./like');
const comments=require('./comment');


module.exports =
{
    loginSignup : loginSignup,
    post:post,
    user:user,
    follow:follow,
    unfollow:unfollow,
    posts: posts,
    likes:likes,
    comments:comments
}