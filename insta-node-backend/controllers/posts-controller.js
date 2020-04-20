const model = require("../models");
const jwtHandler = require("../jwtHandler");
var user = model.user;
//var postsCount =user.postsCount;
class employee{
    constructor(){
    }
    async createNewPost(req, res){
        let token = jwtHandler.tokenVerifier(req.headers.token);
        if(token)
        {
            let newPost={
                ownerId:req.body.ownerId,
                url:req.body.url, 
                caption:req.body.caption
                  };
        
            const postObj= await model.posts.save(newPost);
            res.send(postObj)
        
            try{
                const userWhoCreatedPost = await user.findOne({_id:newPost.ownerId}); 
                var postsCount=userWhoCreatedPost.postsCount;
                await user.updateOne({ _id : newPost.ownerId  }, { postsCount:postsCount + 1 });        
            
            }
            catch(error){
                    
            }
        }
        else{
            res.status(401).send("Unauthorized");
        }
                
    }
  
    async showAll(req,res) {
        let token = jwtHandler.tokenVerifier(req.headers.token);
        
        if(token)
        {
            const post = await model.posts.get({"ownerId":req.params.id});
            const userData=await model.user.get({"_id":req.params.id})
            const userPost={
                "ownerId":post.ownerId,
                "instaHandle":userData.instaHandle,
                "url": post.url,
                "caption": post.caption,
                "likesCount": post.likesCount,
                "commentsCount": post.commentsCount,
                "recentLikes": post.recentLikes,
                "hashtags": post.hashtags,
                "_id": post._id,
                "createdAt": post.createdAt
 }
            res.send(JSON.stringify(userPost));
        }
        else{
            res.status(401).send("Unauthorized");
        }

    }
    async show(req,res) {
        let token = jwtHandler.tokenVerifier(req.headers.token);
        if(token)
        {
            let postObj= await model.posts.get({"ownerId": req.params.id});
            res.send(postObj);
        }
        else{
            res.status(401).send("Unauthorized");
        }
    }
}
module.exports = new employee();