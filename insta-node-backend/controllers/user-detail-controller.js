const model = require("../models");
const jwtHandler = require("../jwtHandler");
class employee{
    constructor(){
    }

    async update(req, res){
        let updateObject = {...req.body};
        model.userModel.update(updateObject);
    }

    async deleteAccount(req, res){
        const deleteObj=await model.userModel.delete({ _id: req.params.id});
        res.send(deleteObj); 
    }

    async show(req, res){
        if(jwtHandler.tokenVerifier(req.token)){
            const user = await model.userModel.get({"_id": req.params.id}, 
                                        {
                                            "instaHandle": 1,
                                            "name": 1,
                                            "profileImage": 1,
                                            "about": 1,
                                            "postsCount": 1,
                                            "followers": 1,
                                            "following": 1
                                        });
            res.send(user);
        }
        else{
            res.status(401).send("Unauthorized");
        }
    }
    // async updateFollow(req,res){
    //     // let followerObj={
    //     //     $inc: {'following':1}
    //     // }
    //     // let followedObj={
    //     //     $inc:{'follower':1}
    //     // }
    //     const follower = await model.userModel.follow({"instaHandle": req.body.followerId},followerObj)
    //     const folowed = await model.userModel.follow({"instaHandle":req.body.followedId},followerObj)
    //     let followerObj={
    //         "ownerId" : req.body.followedId,
    //         "followerId": req.body.followerId
    //     }
    //     let followedObj = {
    //         "ownerId": req.body.followerId,
    //         "followingId" : req.body.followedId
    //     }
    //     const follower = await model.followerModel.follow(followerObj);
    //     const followed = await model.followingModel.follow(followedObj);

    //     res.send("now following user")
    // }
    // async updateUnfollow(req,res){
    //     let unfollowerObj={
    //         $inc: {'following':-1}
    //     }
    //     let unfollowedObj={
    //         $inc:{'follower':-1}
    //     }
    //     const unfollower = await model.userModel.unfollow({"instaHandle": req.body.unfollowerId},unfollowerObj);
    //     const unfollowed = await model.userModel.unfollow({"instaHandle": req.body.unfollowedId},unfollowedObj);
    //     const unfollower = await model.followerModel.unfollow({"ownerId": req.body.unfollowedId,"followerId":req.body.unfollowerId});
    //     const unfollowed = await model.followingModel.unfollow({"ownerId":req.body.unfollowerId,"followingId":req.body.unfollowedId});
    //     res.send("now unfollowed user");
    // }
}
module.exports = new employee();