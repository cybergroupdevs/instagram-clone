const model = require("../models");
const jwtHandler = require("../jwtHandler");

class follow{
    constructor(){
    }
    
    async updateFollow(req, res){
        const token = jwtHandler.tokenVerifier(req.headers.token);
        let user = await model.user.getOne({instaHandle:req.query.ownerId})
        if(token){
            
            let followObj={
                ownerId:user._id,
                followerId:req.query.followerId,
            }

            let followingObj={
                ownerId:req.query.followerId,
                followingId:user._id
            }

            const relation = await model.follower.getRelation(followObj);
            
            if (relation == null){
                try{
                // const userToBeFollowed = await user.findOne({_id:followObj.ownerId});
                // const userWhoHasFollowed = await user.findOne({_id:followObj.followerId});
        
                    await model.follower.create(followObj);
                    await model.following.create(followingObj);
            
                    var userToBeFollowed = await model.user.get({ _id: followObj.ownerId });
                    var userWhoHasFollowed = await model.user.get({ _id : followObj.followerId });
        
                    var followerCount = userToBeFollowed[0].followers;
                    var followingCount = userWhoHasFollowed[0].following;
            
                    await model.user.update({ _id : followObj.ownerId  }, { followers: followerCount + 1 });
                    await model.user.update({ _id: followObj.followerId }, { following: followingCount + 1 });
                    
                    res.status(200).send({"message":"now following user"});
                }
                    
                catch(error){
                    console.error;    
                }
            }

            else{
                res.send("Already a follower");
            }
        }

        else{
            res.status(401).send("Unauthorized");
        }
    }

    async getFollowers(req, res){
        const token=jwtHandler.tokenVerifier(req.headers.token);
        if(token){
            
            let user = await model.user.getOne({instaHandle:req.params.id})
            console.log(user, "user")
            let allFollowers = await model.follower.getAll({"ownerId":user._id});
            
            allFollowers = await Promise.all( allFollowers.map(async(follower) => {
                const relation = await model.follower.getRelation({ ownerId: follower.followerId._id, followerId: token.data._id })
                return {follower, relation: (relation? true: false) }
            }) );

            if (allFollowers != null){
                res.status(200).send({
                    success: true,
                    payload : {
                        data: {
                            allFollowers
                        },
                        message: "returned followers list",
                    }
                }) 
            }

            else{
                res.send({"message":"no followers"})
            }   
        }
        else{
            res.status(401).send("Unauthorized");
        }
    }

    async getFollowing(req, res){
        const token=jwtHandler.tokenVerifier(req.headers.token);
        if(token){
            let user = await model.user.getOne({instaHandle:req.params.id})
            let allFollowing = await model.following.getAll({"ownerId":user._id});

            allFollowing = await Promise.all( allFollowing.map(async(following) => {
                const relation = await model.follower.getRelation({ ownerId: following.followingId._id, followerId: token.data._id })
                return {following, relation: (relation? true: false) }
            }) );

            if (allFollowing != null){
                res.status(200).send({
                    success: true,
                    payload : {
                        data: {
                            allFollowing
                        },
                        message: "returned following list",
                    }
                }) 
            }
            else{
                res.send({"message":"no following"})
            }   
        }
        else{
            res.status(401).send("Unauthorized");
        }
    }

    async followRelation(req,res){
        const token=jwtHandler.tokenVerifier(req.headers.token);
        if(token){
            
            let user = await model.user.getOne({instaHandle:req.query.ownerId})
            let searchObj = {ownerId : user._id, followerId:req.query.followerId}
            const relation = await model.follower.getRelation(searchObj);
            if (relation != null){
                
                res.send({"success":true, "message":"following" }) 
            }
            else{
                res.send({"success":false,"message":"not following"})
            }   
        }
        else{
            res.status(401).send("Unauthorized");
        }
    }
}
module.exports = new follow()