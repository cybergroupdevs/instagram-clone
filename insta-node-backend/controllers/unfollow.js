const model = require('../models')
const jwtHandler = require("../jwtHandler");
class unfollow{
    constructor(){

    }
    async updateUnfollow(req,res){
        let user = await  model.user.getOne({instaHandle:req.query.ownerId})
        const token=jwtHandler.tokenVerifier(req.headers.token);
        if(token){
            let followObj={
                ownerId:user._id,
                followerId:req.query.unfollowerId,
            }

            let followingObj={
                ownerId:req.query.unfollowerId,
                followingId:user._id
            }

            const relation = await model.follower.getRelation(followObj);
            
            if (relation != null){
                try{
                    await model.follower.delete(followObj);
                    await model.following.delete(followingObj);
            
                    var userToBeFollowed = await model.user.get({ _id: followObj.ownerId });
                    var userWhoHasFollowed = await model.user.get({ _id : followObj.followerId });
        
                    var followerCount = userToBeFollowed[0].followers;
                    var followingCount = userWhoHasFollowed[0].following;
            
                    await model.user.update({ _id : followObj.ownerId  }, { followers: followerCount - 1 });
                    await model.user.update({ _id: followObj.followerId }, { following: followingCount - 1 });
                    res.status(200).send({"message":"unfollowing user"});
                }
                    
                catch(error){
                    console.error;    
                }
            }

            else{
                res.send("already not a follower");
            }
        }

        else{
            res.status(401).send("Unauthorized");
        }
    }
}
module.exports =new unfollow()