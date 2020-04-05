const mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = {
  user: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  caption: {
    type: String,
    default: null,
    maxlength: 500
  },
  mentions: [
    {
      type: ObjectId,
      ref: "User"
    }
  ],
  tags: [
    {
      type: String,
      maxlength: 20,
      unique: true
    }
  ],
  count: {
    likeCount: Number,
    commentCount: Number
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
};
