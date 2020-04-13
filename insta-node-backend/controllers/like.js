const models=require('../models');
var posts =models.posts;
var likesModel=models.likes;
//var likesCount=posts.likesCount;
class like{
    constructor(){ }
    async updateLike(req,res){
        let likeObj={
            ownerId: req.body.ownerId,
            uploadId: req.body.uploadId
        }
        try{
            
            await likesModel.save({ ownerId: likeObj.ownerId, uploadId:likeObj.uploadId});
            var liked = await posts.findOne({ _id:likeObj.uploadId });
            var likesCount = liked.likesCount;
            await posts.updateOne({ _id: likeObj.uploadId }, {likesCount:likesCount+1});
            console.log(liked.likesCount);
            res.send("liked image");
        }
        catch(error){
            console.log(error);
            
        }
    }

    async getLikes(req,res){
        try{
            const postId = req.params.id
            let likesArray = await models.like.log({post:postId})
            console.log(likesArray, "array")
            
            let allLikes = await Promise.all( likesArray.map(async(like) => {
                const relation = await models.follower.getRelation({ ownerId: like.likedBy._id, followerId: req.user.data._id })
                return {like, relation: (relation? true: false) }
            }) );


            res.send({
                success: true,
                payload: {
                    data : {
                        allLikes
                    },
                    message: "likes returned successfully!!"
                }
              });
        }
        catch(error){
            console.log(error)

        }
        

    }

}
module.exports = new like()