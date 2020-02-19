const model = require("../models");
const jwtHandler = require("../jwtHandler");
class employee{
    constructor(){
    }

    async createUser(req, res){
        const instaHandle=await model.user.get({instaHandle:req.body.instaHandle});
        if(instaHandle)
        {
            res.status(406).send("InstaHandle already exists!!");
        }
        else
        {
        let userObject = {
            name : req.body.name,
            instaHandle : req.body.instaHandle,
            phone : req.body.phone,
            email : req.body.email,
            password : req.body.password
        };
        const user=await model.user.save(userObject);
        res.status(200).send("Signed Up Successfully");
    }
    }

    async checkUserAuthentication(req, res){
        let user = await model.user.get({$and : [{"instaHandle": req.body.instaHandle},{"password": req.body.password}]
                                                }, 
                                                {"instaHandle": 1,
                                                "name": 1,
                                                "_id": 1
                                            });
        if(user != null || user != []){
            let token = jwtHandler.tokenGenerator(user);
            if(token != null)
                res.status('200').send(token);
            else
                res.status('503').send("Some Error Occured while generating token");
        }
        else{
            res.status(401).send(user);
        }
    }
}
module.exports = new employee();