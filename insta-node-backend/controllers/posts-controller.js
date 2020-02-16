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

    async show(req, res){
    }

    async index(req, res){
    }
}
module.exports = new employee();