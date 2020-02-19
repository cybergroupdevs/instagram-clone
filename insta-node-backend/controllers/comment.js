const models=require('../models');
var posts =models.posts;
var commentsModel=models.comments;

class comment{
    constructor(){ }
    async addComment(req,res){
        let commentObj={
            ownerId: req.body.ownerId,
            uploadId: req.body.uploadId,
            comment:req.body.comment
        }
        try{
            
            await commentsModel.save({ ownerId: commentObj.ownerId, uploadId:commentObj.uploadId, comment:commentObj.comment});
            var commented = await posts.findOne({ _id:commentObj.uploadId });
            var commentsCount = commented.commentsCount;
            await posts.updateOne({ _id: commentObj.uploadId }, {commentsCount: commentsCount+1});
            console.log(commented.commentsCount);
            res.send("commented");
    }
    catch(error){
        console.log(error);
        
    }
}
}
module.exports = new comment()