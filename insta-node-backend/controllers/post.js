const model = require("../models");

class Post {
  constructor() {}

  async create(req, res){
    console.log(req.body);
    const { mentions, tags, caption } = req.body;

    let mentionsWithId = [];

    await Promise.all(
      mentions.map(async mention => {
        mention = mention.replace('@', '');
        let id = await (model.user.getOne({ instaHandle: mention }))._id;
        if(!id) return;
        mentionsWithId = [ ...mentionsWithId, id ];
      })
    );

    let postBody = { mentions: mentionsWithId, caption, tags, user: req.user.data._id };

    await model.post.save(postBody);

    res.send({
      success: true,
      payload: {
        message: 'Post Created Successfully!'
      }
    })
  }

  async operations(req, res) {
    const post = await model.post.findById(req.params.postId);

    if (req.query.type === "like") {
      if (req.query.operation === "inc") {
        await model.post.modify(
          { _id: req.params.postId },
          { "count.likeCount": ++post.count.likeCount }
        );

        await model.like.save({
          post: req.params.postId,
          likedBy: req.body.user
        });
      }
      if (req.query.operation === "dec") {
        await model.post.modify(
          { _id: req.params.postId },
          { "count.likeCount": --post.count.likeCount }
        );

        await model.like.deleteOne({
          post: req.params.postId,
          likedBy: req.body.user
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
          commentedBy: req.body.user,
          content: req.body.content
        });
      }

      if (req.query.operation === "dec") {
        await model.post.modify(
          { _id: req.params.postId },
          { "count.commentCount": --post.count.commentCount }
        );

        await model.like.deleteOne({
          post: req.params.postId,
          commentedBy: req.body.user
        });
      }
    }

    if (req.query.type === "reply") {
      if (req.query.operation === "inc") {
        await model.reply.create({
          comment: req.query.comment,
          repliedBy: req.query.repliedBy,
          content: req.query.content
        });
      }
      if (req.query.operation === "dec") {
        await model.reply.deleteOne({ _id: req.query.reply });
      }
    }

    res.send({
      success: true,
      payload: {
          message: 'Operation Successful, Hopefully (Check Api and Database)!!!'
      }
    });
  }
}

module.exports = new Post();