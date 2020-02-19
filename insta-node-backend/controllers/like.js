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
}
module.exports = new like()