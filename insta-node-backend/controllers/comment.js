const models=require('../models');
const fs = require("fs");
const path = require("path");
const multer = require("multer");


class comment{
    constructor(){ }
    
    async getComments(req,res){
        try{
            console.log("inside api commenty ------------->>>>>>>>>>>>>>>>")
            const postId = req.params.id
            let commentsArray = await models.comment.log({post:postId})
            console.log(commentsArray, "array")

            // commentsArray = commentsArray.map((comment) => {
            //     return { comment, image: fs.readFileSync(comment.commentedBy.image) }
            //   });
          

            res.send({
                success: true,
                payload: {
                    data : {
                        commentsArray
                    },
                    message: "commentsArray returned successfully!!"
                }
              });
        }
        catch(error){
            console.log(error)

        }
    }

}
module.exports = new comment()