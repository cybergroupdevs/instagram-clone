const loginSignup=require('./login-signup-controller');
const post=require('./posts-controller');
const  user=require('./user-detail-controller')
const follow=require('./follow')
const posts = require('./posts_upload');


module.exports =
{
    loginSignup : loginSignup,
    post:post,
    user:user,
    follow:follow,
    posts: posts
}