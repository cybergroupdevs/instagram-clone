const models=require('../models');
const fs = require("fs");
const path = require("path");
const multer = require("multer");


class comment{
    constructor(){ }
    
    async getComments(req,res){
        try{
            const postId = req.params.id
            let commentsArray = await models.comment.log({post:postId})
         
            commentsArray = commentsArray.map((comment) => {
                const bufferedImage = comment.commentedBy.image ? fs.readFileSync(comment.commentedBy.image) : comment.commentedBy.image;
          
                return { ...comment.toObject(), bufferedImage };
              });
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
          
        }
    }

}
module.exports = new comment()