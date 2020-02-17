const controller=require('../controllers');
module.exports=(app) => {
   
       
         app.post("/login",controller.loginSignup.checkUserAuthentication);
         app.post("/signup",controller.loginSignup.createUser);
         app.get("/",controller.user.show);
         app.put("/user/:id",controller.user.update);
         app.delete("/user/:id",controller.user.deleteAccount);
}