var multer  = require('multer');
var fs  = require('fs');
var model = require('../models');
var jwtHandler = require('../jwtHandler');

class posts {
    constructor() { 
    }
    async createNewPost(req, res){
        if(!jwtHandler.tokenVerifier(req.headers.token)){
            if (!req.file) {
                
                return res.send({
                    "success": false
                });
            } 
            else {
                let postObj = {
                    ownerId: req.body.ownerId,
                    url: req.file.filename,   //changed
                    caption: req.body.caption,
                    createdAt: Date.now()
                };
                try{
                    const tempObj = await model.post.save(postObj);
                    return res.status(200).send({"message":"Uploaded"});
                }catch(err){
                    return res.status(501).send("Some Error Occured");
                }
            }
        }
        else{
            return res.status(401).send("Unauthorized");
        }
    }
}

module.exports = new posts();