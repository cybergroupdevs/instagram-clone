const model = require("../models");
const jwtHandler = require("../jwtHandler");

class follow{
    constructor(){
    }
    
    async updateFollow(req, res){
    
    // const { ownerId, followerId } = req.body;

        const token=jwtHandler.tokenVerifier(req.headers.token);
        if(token){

            console.log(req.body, "my body---------------->>>")
            
            let followObj={
                ownerId:req.body.ownerId,
                followerId:req.body.followerId,
            }

            let followingObj={
                ownerId:req.body.followerId,
                followingId:req.body.ownerId
                

            }

            
            console.log(followObj.ownerId, "hellooooooooooooooooooo")

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
                    res.send("now following user");
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
}

module.exports = new follow()
