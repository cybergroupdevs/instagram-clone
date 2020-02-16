const model = require("../models");
const jwtHandler = require("../jwtHandler");
class employee{
    constructor(){
    }

    async createLike(req, res){
        model.likes.save({
            OwnerId: req.instaHandle,
            UploadId: 
        });
    }

    async show(req, res){
    }

    async index(req, res){
    }
}
module.exports = new employee();