const loginSignup = require('./login-signup-controller');
const post = require('./posts-controller');
const  user = require('./user-detail-controller')
const posts = require('./posts_upload');


module.exports =
{
    loginSignup : loginSignup,
    posts: posts,
    post: post,
    user: user
}