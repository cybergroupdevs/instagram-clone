const loginSignup=require('./login-signup-controller');
const post=require('./posts-controller');
const  user=require('./user-detail-controller')
const follow=require('./follow')
const unfollow=require('./unfollow')

module.exports =
{
    loginSignup : loginSignup,
    post:post,
    user:user,
    follow:follow,
    unfollow:unfollow
}