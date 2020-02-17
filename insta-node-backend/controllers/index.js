const loginSignup=require('./login-signup-controller');
const post=require('./posts-controller');
const  user=require('./user-detail-controller')

module.exports =
{
    loginSignup : loginSignup,
    post:post,
    user:user
}