const loginSignup=require('./login-signup-controller');
const post=require('./posts-controller');
const  user=require('./user-detail-controller')
const follow=require('./follow')
const unfollow=require('./unfollow')
const posts = require('./posts_upload');

module.exports =
{
    loginSignup : loginSignup,
    post:post,
    user:user,
    follow:follow,
    unfollow:unfollow,
    posts: posts
}