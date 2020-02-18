const models=require('../models')
var user= models.user;
var followersModel =models.followers;
var followingModel =models.following;
var followers =user.followers;

class unfollow{
    constructor(){

    }
    async updateUnfollow(req,res){
        let unfollowObj={
            ownerId: req.body.ownerId,
            followerId: req.body.followerId
        }
        try{
            const userToBeUnfollowed = await user.findOne({instaHandle:unfollowObj.ownerId});
            const userWhoHasUnfollowed = await user.findOne({instaHandle:unfollowObj.followerId});
            await followersModel.deleteOne({ ownerId: userToBeUnfollowed, followerId: userWhoHasUnfollowed });
            await followingModel.deleteOne({ ownerId: userWhoHasUnfollowed, followingId: userToBeUnfollowed });
        
            var follower = await user.findOne({ instaHandle: unfollowObj.ownerId });
            var following = await user.findOne({ instaHandle: unfollowObj.followerId });
            followers = follower.followers;
            following = following.following;
        
            await user.updateOne({ instaHandle : unfollowObj.ownerId  }, { followers: followers - 1 });
            await user.updateOne({ instaHandle: unfollowObj.followerId }, { following: following - 1 })
            res.send("now unfollowed user")
            }
            
           
            catch(error){
                console.log(error);
                
            }
    }
}
module.exports =new unfollow()