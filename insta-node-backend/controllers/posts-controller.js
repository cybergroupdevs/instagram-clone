const model = require("../models");
const jwtHandler = require("../jwtHandler");
class employee{
    constructor(){
    }

    async createLike(req, res){
        let userObjectId = model.user.get({"instaHandle": req.body.instaHandle},
                        {"_id": 1});
        //From FrondEnd, when the user likes a post, send the post Id here as postId
        let postObjectId = model.likes.get({"uploadId": req.body.postId});
        if(objectId != null){
            model.likes.save({
                ownerId: userObjectId._id,
                uploadId: postObjectId._id
            });
        }
        
    }
    async createNewPost(req, res){
        let newPost={
                ownerId:req.body.ownerId,
                url:req.body.url, //determine how to store images by kritika
                caption:req.body.caption,
                hashtags:req.body.hashtags,
                likesCount:req.body.likesCount,
                commentsCount:req.body.commentscount,
                  },
        
        const postObj= await model.postsModel.save(newPost)
        res.send(postObj);
    }
    async show(req,res) {
        const post = await model.postsModel.get();
        res.send(post);
    }
   
}
module.exports = new employee();