const model = require("../models");
const jwtHandler = require("../jwtHandler");
const bcrypt = require('bcrypt');

class employee{
    constructor(){
    }

    async createUser(req, res){
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        try{
            let user =await model.user.get({"instaHandle":req.body.instaHandle});
            if(user[0]==null )
            {
                let userObject = {
                    name : req.body.name,
                    instaHandle : req.body.instaHandle,
                    phone : req.body.phone,
                    email : req.body.email,
                    password : req.body.password
                };
                var instaUser = await model.user.save(userObject);
                res.status(200).send({"success":true, "message":"user created"});
            }
            else{
                res.status(406).send({"success":false, "message":"Instahandle already exists"});
            }
        }
        catch(error)
        {
            console.error
            res.status(406).send({"success":false, "message":"Email or phone already exists"});
        }
    }

    async checkUserAuthentication(req, res){
        let user = await model.user.get({$and : [{"instaHandle": req.body.instaHandle},{"password": req.body.password}]});
        if(user[0] != null){
            
            let token = jwtHandler.tokenGenerator(user);
            if(token != null){
                let resBody = {
                    "token": token
                };
                res.status(200).send(resBody);
            }
            else{
                console.log("Token is Null");
            }
        }
        else {
            
            res.status(401).send({
                "message": "Incorrect Email or username"
            });
        }
    }
}

module.exports = new employee();