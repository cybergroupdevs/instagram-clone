const model = require("../models");
const jwtHandler = require("../jwtHandler");
<<<<<<< HEAD
=======
const schema = require("../schemas")
// const express = require('express')
// const router = express.Router()
const followerModel = require('../schemas/follower')
const followingModel = require('../schemas/following')

>>>>>>> dea045d8ecd16c06e25ceb3ce46b54221ad3d7a4
class employee{
    constructor(){
    }

<<<<<<< HEAD
    async createAccount(req, res){
    }

    async match(req, res){
    }

    // async update(req, res){
    // }

    async deleteAccount(req, res){
    }

    async show(req, res){
    }

    async index(req, res){
    }
=======
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
>>>>>>> dea045d8ecd16c06e25ceb3ce46b54221ad3d7a4
}
module.exports = new employee();