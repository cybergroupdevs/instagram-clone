const controller=require('../controllers');
var multer  = require('multer');
var fs  = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var dir = '../postsDb';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname + '-' + Date.now());
        //appends the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC. to start of original file name
    }
});
let upload = multer({storage: storage});

module.exports=(app) => {

         app.post("/login", controller.loginSignup.checkUserAuthentication);
         app.post("/signup", controller.loginSignup.createUser);
         app.get("/user", controller.user.show);
         app.put("/user/:id", controller.user.update);
         app.delete("/user/:id", controller.user.deleteAccount);
         app.post("/upload", upload.single('image'), controller.post.createNewPost);
         app.get("/upload",controller.post.showAll);
         app.get("/upload/:id",controller.post.show);
        app.put("/follow",controller.follow.updateFollow);
}