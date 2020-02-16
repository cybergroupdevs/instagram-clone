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
                uploadId: 
            });
        }
        
    }
    async updateFollow(req,res){
        let followerObj={
            $inc: {'following':1}
        }
        let followedObj={
            $inc:{'follower':1}
        }
        const follower = await model.userModel.follow({"instaHandle": req.body.followerId},followerObj)
        const folowed = await model.userModel.follow({"instaHandle":req.body.followedId},followerObj)
        let followerObj={
            "ownerId" : req.body.followedObj,
            "followerId": req.body.followerId
        }
        let followedObj = {
            "ownerId": req.body.followerId,
            "followingId" : req.body.followedId
        }
        const follower = await model.followerModel.follow(followerObj);
        const followed = await model.followingModel.follow(followedObj);

        res.send("now following user")
    }
    async updateUnfollow(req,res){
        let unfollowerObj={
            $inc: {'following':-1}
        }
        let unfollowedObj={
            $inc:{'follower':-1}
        }
        const unfollower = await model.userModel.unfollow({"instaHandle": req.body.unfollowerId},unfollowerObj);
        const unfollowed = await model.userModel.unfollow({"instaHandle": req.body.unfollowedId},unfollowedObj);
        const unfollower = await model.followerModel.unfollow({"ownerId": req.body.unfollowedId,"followerId":req.body.unfollowerId});
        const unfollowed = await model.followingModel.unfollow({"ownerId":req.body.unfollowerId,"followingId":req.body.unfollowedId});
        res.send("now unfollowed user");
    }
    async show(req, res){
    }

    async index(req, res){
    }
}
module.exports = new employee();