const model = require("../models");
const jwtHandler = require("../jwtHandler");
class employee{
    constructor(){
    }

    async update(req, res){
        let updateObject = {...req.body};
        model.user.update(updateObject);
    }

    async deleteAccount(req, res){
        // ??????????????????????????????
    }

    async show(req, res){
        if(jwtHandler.tokenVerifier(req.token)){
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
            res.send(allEmp);
        }
        else{
            res.status(401).send("Unauthorized");
        }
    }
}
module.exports = new employee();