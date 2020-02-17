const model = require("../models");
const jwtHandler = require("../jwtHandler");
class employee{
    constructor(){
    }
    async createLike(req, res){
        let userObjectId = model.user.get({"instaHandle": req.body.instaHandle},
                        {"_id": 1});
        //From FrondEnd, when the user likes a post, send the post Id here as postId
        let postObjectId = model.likesModel.get({"uploadId": req.body.postId});
        if(objectId != null){
            model.likes.save({
                ownerId: userObjectId._id,
                uploadId: postObjectId._id
            });
        }
        
    }
    async createNewPost(req, res){
        let token = jwtHandler.tokenVerifier(req.body.token);
        console.log(token);
        if(token)
        {
            let newPost={
                ownerId:req.body.ownerId,
                url:req.body.url, //determine how to store images by kritika
                caption:req.body.caption
                  };
        
        const postObj= await model.posts.save(newPost);
        res.send(postObj);
        }
        else{
            res.status(401).send("Unauthorized");
        }
                }
  
    async showAll(req,res) {
        let token = jwtHandler.tokenVerifier(req.body.token);
        console.log(token);
        if(token)
        {
        const post = await model.posts.get();
        res.send(post);
        }
        else{
            res.status(401).send("Unauthorized");
        }

    }
    async show(req,res) {
        let token = jwtHandler.tokenVerifier(req.header.token);
        console.log(JSON.stringify(token));
        if(token)
        {
    const userObj= await model.posts.get({_id:req.params.id});
    res.send(userObj);
     }
else{
   res.status(401).send("Unauthorized");
    }
}
}
module.exports = new employee();