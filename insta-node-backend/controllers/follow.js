const model = require("../models");
const jwtHandler = require("../jwtHandler");

class follow{
    constructor(){
    }
    
    async updateFollow(req, res){
        console.log(req.query, "my body---------------->>>")
        // const { ownerId, followerId } = req.body;
        console.log(req.headers, "headers")
        const token=jwtHandler.tokenVerifier(req.headers.token);
        console.log(token, "token in follow")
        if(true){

            console.log(req.query, "my body---------------->>>")
            
            let followObj={
                ownerId:req.query.ownerId,
                followerId:req.query.followerId,
            }

            let followingObj={
                ownerId:req.query.followerId,
                followingId:req.query.ownerId
            }

            const relation = await model.follower.getRelation(followObj);
            console.log(relation, "relay----------->>>>")
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
                    console.log("above status ")
                    res.status(200).send({"message":"now following user"});
                }
                    
                catch(error){
                    console.log(error);    
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
        console.log(token, "token in followers get")
        if(token){
            
            let searchId = req.params.id;
            const allFollowers = await model.follower.getAll({"ownerId":searchId});
            
            if (allFollowers != null){
                res.status(200).send(allFollowers) 
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

            let searchId = req.params.id;
            const allFollowing = await model.following.getAll({"ownerId":searchId});
            
            if (allFollowing != null){
                res.status(200).send(allFollowing) 
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
            console.log(req.query, "check 1")
            let searchObj = req.query;
            const relation = await model.follower.getRelation(searchObj);
            console.log(relation, "relation")
            if (relation != null){
                
                res.status(200).send(relation) 
            }
            else{
                res.status(404).send({"message":"not following"})
            }   
        }

        else{
            res.status(401).send("Unauthorized");
        }
    }

}

module.exports = new follow()
