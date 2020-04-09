const model = require("../models");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file, "file inside destination");
    console.log(req.user.data.instaHandle, "instaHandle");
    let dir = `./uploads/${req.user.data.instaHandle}`;
    console.log(dir, 'before fs.exists');

    if(!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    };
    dir = `./uploads/${req.user.data.instaHandle}/posts`;

    fs.exists(dir, (exist) => {
      console.log(dir, 'Inside second fs.exists');
      if (!exist) return fs.mkdir(dir, (error) => cb(error, dir));

      return cb(null, dir);
    });  
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) return cb(null, true);
    return cb("Error: Images Only");
  },
}).single("imageFile");

class Post {
  constructor() {}

  async create(req, res) {
    console.log(req.file);

    upload(req, res, async (error) => {
      if (error) {
        return res.status(400).send({
          success: false,
          payload: {
            message: error,
          },
        });
      }

      const file = req.file;
      console.log(req.file);
      if (!file) {
        const error = new Error("No File");
        return res.status(400).send({
          success: false,
          payload: {
            message: error,
          },
        });
      }
      console.log(req.body);

      let { mentions, hashtags, caption } = req.body;
      hashtags = hashtags.split(',');
      mentions = mentions.split(',');

      let mentionsWithId = [];

      await Promise.all(
        mentions.map(async (mention) => {
          mention = mention.replace("@", "");
          let id = await model.user.getOne({ instaHandle: mention })._id;
          if (!id) return;
          mentionsWithId = [...mentionsWithId, id];
        })
      );

      let postBody = {
        mentions: mentionsWithId,
        caption,
        hashtags,
        image: file.path,
        user: req.user.data._id,
      };

      await model.post.save(postBody);

      res.send({
        success: true,
        payload: {
          message: "Post Created Successfully!",
        },
      });
    });
  }

  async operations(req, res) {
    const post = await model.post.findById(req.params.postId);

    if (req.query.type === "like") {
      if (req.query.operation === "inc") {
        if (await model.like.get({ post: req.params.postId, likedBy: req.user.data._id }))
          return res.status(400).send({
            success: false,
            payload: {
              message: 'Already Liked'
            }
          });

        await model.post.modify(
          { _id: req.params.postId },
          { "count.likeCount": ++post.count.likeCount }
        );

        await model.like.save({
          post: req.params.postId,
          likedBy: req.user.data._id,
        });
      }

      if (req.query.operation === "dec") {
        if (!await model.like.get({ post: req.params.postId, likedBy: req.user.data._id }))
          return res.status(400).send({
            success: false,
            payload: {
              message: 'Attempt of unnecessary dislike'
            }
          });

        await model.post.modify(
          { _id: req.params.postId },
          { "count.likeCount": --post.count.likeCount }
        );

        await model.like.deleteOne({
          post: req.params.postId,
          likedBy: req.user.data._id
        });
      }
    }

    if (req.query.type === "comment") {
      if (req.query.operation === "inc") {
        await model.post.modify(
          { _id: req.params.postId },
          { "count.commentCount": ++post.count.commentCount }
        );

        await model.comment.save({
          post: req.params.postId,
          commentedBy: req.user.data._id,
          content: req.body.content,
        });
      }

      if (req.query.operation === "dec") {
        if(await model.comment.get({ _id: req.body.commentId })){
          await model.post.modify(
            { _id: req.params.postId },
            { "count.commentCount": --post.count.commentCount }
          );
  
          await model.comment.deleteOne({
            _id: req.body.commentId
          });
        }
      }
    }

    if (req.query.type === "reply") {
      if (req.query.operation === "inc") {
        await model.reply.create({
          comment: req.body.commentId,
          repliedBy: req.user.data._id,
          content: req.body.content,
        });
      }
      if (req.query.operation === "dec") {
        await model.reply.deleteOne({ _id: req.body.replyId });
      }
    }

    res.send({
      success: true,
      payload: {
        message: "Operation Successful, Hopefully (Check Api and Database)!!!",
      },
    });
  }

  async getFeed(req, res){
    
    const loggedInUserId = req.user.data._id
    let feed = await model.post.index({user:loggedInUserId})
    let followingList = await model.following.getAll({ownerId : loggedInUserId})
    
    await Promise.all(
      followingList.map(async following => {
        const followingId = following.followingId._id
        let followingPosts = await model.post.index({user:followingId})
        feed = feed.concat(followingPosts)
      })
    );
    
    let feedFinal = feed.sort((a, b) => b.createdAt - a.createdAt)

    feedFinal = await Promise.all(
      feedFinal.map(async (item) => {
        const postId = item._id
        
        let likesArray = await model.like.log({post : postId})
        let commentsArray = await model.comment.log({ post : postId })

        let returnObj = { ...item.toObject(), likesArray, commentsArray };
        if(!item.image){
          return returnObj;
        }
        console.log(fs.readFileSync(item.image), 'IMAGE AFTER READ FILE');
        console.log(fs.createReadStream(item.image));
        return { ...returnObj, image: fs.readFileSync(item.image) }
      })
    );
    
      
    res.send({
      success: true,
      payload: {
          data : {
            feedFinal
          },
          message: "feed returned"
      }
    });

  }

}

module.exports = new Post();
