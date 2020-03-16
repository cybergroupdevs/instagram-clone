const model = require("../models");
const jwtHandler = require("../jwtHandler");
const schema = require("../schemas")


class employee{
    constructor(){
    }

    async update(req, res){
        if(jwtHandler.tokenVerifier(req.headers.token)){
            try{
                let instaHandle={};
          instaHandle=await model.user.get({"instaHandle":req.body.instaHandle},{});
            if(instaHandle.instaHandle!=req.body.instaHandle)
            {
              
        let updateObject  = {}; 
        updateObject = {...updateObject,...req.body};
        const userObj=await model.user.update({ _id: req.params.id}, updateObject);
        res.send(userObj);
        }
    }
    catch(error)
    {
        res.status(406).send("InstaHandle already exists..so it cannot be updated!!");
    }
    }
        else{
            res.status(401).send("Unauthorized");
        }
    }

    async deleteAccount(req, res){
        const token=jwtHandler.tokenVerifier(req.headers.token);
        if(token)
        {
            console.log(token, "my token----->>")
            console.log("recieved token")
            const deleteObj=await model.user.delete({ _id: req.params.id});
            res.send(deleteObj); 
        }
        else{
            res.status(401).send("Unauthorized");
        }

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