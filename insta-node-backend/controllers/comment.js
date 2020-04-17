const models=require('../models');
var posts =models.posts;


class comment{
    constructor(){ }
    
    async getComments(req,res){
        try{
            console.log("inside api")
            const postId = req.params.id
            let commentsArray = await models.comment.log({post:postId})
            console.log(commentsArray, "array")

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