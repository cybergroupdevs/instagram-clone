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
            let instaHandle={};
            instaHandle =await model.user.get({"instaHandle":req.body.instaHandle});
            console.log(instaHandle.instaHandle, "instahandle--->>>");
            if(instaHandle.instaHandle!=req.body.instaHandle)
            {
            
                let userObject = {
                    name : req.body.name,
                    instaHandle : req.body.instaHandle,
                    phone : req.body.phone,
                    email : req.body.email,
                    password : req.body.password
                };
                const user=await model.user.save(userObject);
                res.status(200).send(userObject);
                // res.status(200).send(employee)
            }
        }

        catch(error)
        {
            res.status(406).send("InstaHandle already exists!!");
        }
    }

    async checkUserAuthentication(req, res){
        let user = await model.user.get({$and : [{"instaHandle": req.body.instaHandle},{"password": req.body.password}]});
        console.log(user[0], "printing")
        if(user[0] != null){
            console.log("inside")
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