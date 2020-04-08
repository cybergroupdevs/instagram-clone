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
  image: {
    type: String
  },
  mentions: [
    {
      type: ObjectId,
      ref: "User"
    }
  ],
  hashtags: [
    {
      type: String,
      maxlength: 20
    }
  ],

  // likes:[      //added
  //   {
  //     type: ObjectId,
  //     ref: "Like"

  //   }
  // ],

  // comments:[     //added
  //   {
  //     type: ObjectId,
  //     ref: "Comment"

  //   }
  // ],

  count: {
    likeCount: {
      type: Number,
      default: 0
    },
    commentCount: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },

  location:{
    type: String
  }

};
//RECENT UPDATES