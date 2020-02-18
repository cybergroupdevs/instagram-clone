const model = require("../models");
const jwtHandler = require("../jwtHandler");
const schema = require("../schemas")
// const express = require('express')
// const router = express.Router()
const followerModel = require('../schemas/follower')
const followingModel = require('../schemas/following')

class employee{
    constructor(){
    }

    async update(req, res){
        let updateObject = {...req.body};
        model.user.update(updateObject);
    }

    async deleteAccount(req, res){
        const deleteObj=await model.user.delete({ _id: req.params.id});
        res.send(deleteObj); 
    }

    async show(req, res){
        if(jwtHandler.tokenVerifier(req.headers.token)){
            const user = await model.user.get({"_id": req.params.id}, 
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
    async showAll(req, res){
        const token=jwtHandler.tokenVerifier(req.headers.token);
        if(token)
        {
            const userObj = await model.user.get();
            res.send(userObj);
        }
        else{
            res.status(401).send("Unauthorized");
        }
    }
    async show(req, res){
        const token=jwtHandler.tokenVerifier(req.headers.token);
        if(token)
        {
            const userObj = await model.user.get({_id: req.params.id});
            res.send(userObj);
        }
        else{
            res.status(401).send("Unauthorized");
        }
    }
}
module.exports = new employee();