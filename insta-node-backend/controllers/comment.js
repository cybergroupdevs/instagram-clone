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

            commentsArray = commentsArray.map((comment) => {
                console.log(comment.commentedBy.image, 'inside map');
                const bufferedImage = comment.commentedBy.image ? fs.readFileSync(comment.commentedBy.image) : comment.commentedBy.image;
          
                return { ...comment.toObject(), bufferedImage };
              });
            // commentsArray = commentsArray.map((comment) => {
            //     return { comment, image: fs.readFileSync(comment.commentedBy.image) }
            //   });
          
              console.log(commentsArray, 'commentsArray');
            res.send({
                success: true,
                payload: {
                    data : {
                        commentsArray
                    },
                    message: "commentsArray returned successfully!!"
                }
              });

            //   console.log(commentsArray, "comments------------>>>>>>>")
        }
        catch(error){
            console.log(error)

        }
    }

}
module.exports = new comment()