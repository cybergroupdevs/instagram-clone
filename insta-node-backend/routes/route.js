const controller = require('../controllers');
const authenticator = require('../middlewares/authentication');

module.exports=(app) => {

         app.post("/login", controller.loginSignup.checkUserAuthentication);
         app.post("/signup", controller.loginSignup.createUser);
         app.get("/users", controller.user.showAll);
         app.get("/user", controller.user.show);  
         app.put("/user/:id", controller.user.update);
         app.delete("/user/:id", controller.user.deleteAccount);
         app.put("/checkIfDuplicate", controller.user.checkIfDuplicate);
         app.patch('/changePassword/:id' , controller.user.changePassword);
         app.put("/follow",controller.follow.updateFollow);
         app.get("/followers/:id", controller.follow.getFollowers);
         app.get("/following/:id", controller.follow.getFollowing);
         app.get("/followRelation", controller.follow.followRelation);
         app.put("/unfollow",controller.unfollow.updateUnfollow);
         
         app.patch('/api/file', authenticator, controller.user.changeProfilePic);

         app.post('/api/post', authenticator, controller.post.create);
         app.get ("/feed", authenticator, controller.post.getFeed)

         app.patch("/api/operation/:postId", authenticator, controller.post.operations);
         
         
        //  app.patch('/api/user', controller.user.changeProfilePic);
        //  app.post("/upload", upload.single('image'), controller.posts.createNewPost); //doubt 
        //  app.get("/posts/:id",controller.post.showAll);
        //  app.get("/upload/:id",controller.post.show);
         
        //  app.put("/like",controller.likes.updateLike);
        //  app.post("/comment",controller.comments.addComment);


         //Will add route for post operations!!!
}

