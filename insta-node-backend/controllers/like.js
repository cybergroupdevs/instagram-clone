const models=require('../models');
var posts =models.posts;
var likesModel=models.likes;
//var likesCount=posts.likesCount;
class like{
    constructor(){ }
    
    async getLikes(req,res){
        try{
            console.log("inside api")
            const postId = req.params.id
            let likesArray = await models.like.log({post:postId})
            console.log(likesArray, "array")
            
            let allLikes = await Promise.all( likesArray.map(async(like) => {
                const relation = await models.follower.getRelation({ ownerId: like.likedBy._id, followerId: req.user.data._id })
                console.log("wner id---->>>", like.likedBy)
                return {like, relation: (relation? true: false) }
            }) );

            console.log(allLikes, "all likes")
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