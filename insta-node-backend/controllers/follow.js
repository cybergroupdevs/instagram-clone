const models=require('../models')
var user= models.user;
var followersModel =models.followers;
var followingModel =models.following;
var followers =user.followers;
class follow{
    constructor(){

    }
    
    async updateFollow(req, res){
    
    // const { ownerId, followerId } = req.body;
    let abc={
        ownerId:req.body.ownerId,
        followerId:req.body.followerId,
    }
    try{
    const userToBeFollowed = await user.findOne({instaHandle:abc.ownerId});
    const userWhoHasFollowed = await user.findOne({instaHandle:abc.followerId});
    await followersModel.create({ ownerId: userToBeFollowed, followerId: userWhoHasFollowed });
    await followingModel.create({ ownerId: userWhoHasFollowed, followingId: userToBeFollowed });

    var follower = await user.findOne({ instaHandle: abc.ownerId });
    var following = await user.findOne({ instaHandle:abc.followerId });
    followers = follower.followers;
    following = following.following;

    await user.updateOne({ instaHandle : abc.ownerId  }, { followers: followers + 1 });
    await user.updateOne({ instaHandle: abc.followerId }, { following: following + 1 })
    res.send("now following user")
    }
    
   
    catch(error){
        console.log(error);
        
    }
}

}

module.exports = new follow()